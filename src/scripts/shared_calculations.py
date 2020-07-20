"""Shared constants and functions used by the calculation scripts."""

import json
import pathlib

import pandas as pd

CONTRIBUTION_TYPE = ("A", "C", "I")
EXPENDITURE_TYPE = ("D", "G", "E")

TYPE_COLUMN = "Form_Type"

CSV_KEY = "FilerName"
JSON_KEY = "committee name"

DIRECTORY = "../assets/candidates/2020/"

CSV_PATHS = (
    "../assets/data/netfile_api_2020.csv",
    "../assets/data/netfile_api_2019.csv",
)


def read_csv_df(paths, types, *columns):
    """
    Read dataframe from specified CSV files with the specified columns and type.

    The dataframe's index column is `CSV_KEY`. The types are filtered
    against `TYPE_COLUMN`. `TYPE_COLUMN` isn't included in the returned
    dataframe.

    :param paths: Iterable of file objects or paths.

    :param types: Container of values that the TYPE_COLUMN of the
    dataframe is filtered against.

    :param *columns: Columns to be present in the dataframe.

    :returns: A dataframe with the columns *`columns` and the index of `CSV_KEY`.
    """
    columns += (CSV_KEY, TYPE_COLUMN)
    df = pd.concat(
        pd.read_csv(path, usecols=columns).set_index(CSV_KEY) for path in paths
    )
    # String interpolation using @var failed for an unknown reason so it isn't used
    return df.query("{} in {}".format(TYPE_COLUMN, types)).drop(columns=[TYPE_COLUMN])


def summed_contributions(paths, types, column):
    """
    Read CSV paths into a series and sum the column for each index

    Reads CSV paths with `column`, filtered by `types` (more details
    in read_csv_df documentation) and returns a series with the index
    being the unique values of column constant `CSV_KEY` and the values
    being the summed values in column that corrosponds with `CSV_KEY`.

    :param paths: Iterable of file objects or paths.

    :param types: Types (filtered against `TYPE_COLUMN`; not python types)
    that the column values must be.

    :param column: The column to process

    :returns: Pandas Series of the summed values with index column `CSV_KEY`
    """
    df = read_csv_df(paths, types, column)
    return pd.Series(df[column], index=df.index).groupby(CSV_KEY).sum()


def to_py_type(value):
    """Convert numpy types to normal types."""
    if type(value).__module__ == "numpy" and hasattr(value, "item"):
        return value.item()
    return value


def to_raised_json(series, field, directory=DIRECTORY):
    """
    Update Candidate JSON files in directory from series and field.

    This updates the JSON files in arg directory and its subdirectories)
    that are top level objects (dictionaries) and have constant `JSON_KEY`
    as a key. It uses the value of `JSON_KEY` in the JSON file as the key
    for the series and if the series has that key, updates the
    corrosponding value in the JSON file. It updates the value under
    `file["raised vs spent"][0]` and creates that field if it doesn't
    exist.

    :param series: A pandas Series with the indexes of the value
    assocated with `JSON_KEY` in the JSON file.

    :param field: The field the values will be entered in the JSON file.

    :param directory: Directory the JSON files will be in. Defaults to
    constant `DIRECTORY`.

    :returns: None.
    """
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and file.get(JSON_KEY) in series:
            file.setdefault("raised vs spent", [{}])
            file["raised vs spent"][0][field] = to_py_type(series[file[JSON_KEY]])
            with open(path, "w") as f:
                json.dump(file, f, indent=2)
                f.write("\n")
