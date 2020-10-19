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
    "../assets/data/netfile_api_2018.csv",
)


def read_csv_df(paths, types, *columns):
    """
    Read dataframe from specified CSV files with the specified columns and type.

    The dataframe's index column is `CSV_KEY`. The column is lower cased.
    The types are filtered against `TYPE_COLUMN`.
    `TYPE_COLUMN` isn't included in the returned dataframe.

    To read into a series, see `read_csv_series`

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
    filtered_df = df.query("{} in {}".format(TYPE_COLUMN, types)).drop(
        columns=[TYPE_COLUMN]
    )
    filtered_df.index = filtered_df.index.str.lower()
    return filtered_df


def read_csv_series(paths, types, column):
    """
    Read a series' from the specified CSV files with the specified columns and type.

    The series's index column is `CSV_KEY`. The types are filtered
    against `TYPE_COLUMN`. `TYPE_COLUMN` isn't included in the returned
    dataframe.

    To read into a dataframe, see `read_csv_df`

    :param paths: Iterable of file objects or paths.

    :param types: Container of values that the TYPE_COLUMN of the
    dataframe is filtered against.

    :param column: The column to read from the CSV file.

    :returns: A pandas series with the index of `CSV_KEY` and the values
    of param `column`.
    """
    read_df = read_csv_df(paths, types, column)
    return pd.Series(read_df[column], index=read_df.index)


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

    :returns: Pandas Series of the summed values with index column `CSV_KEY`.
    The values are rounded, being converted to int64.
    """
    df = read_csv_df(paths, types, column)
    return (
        pd.Series(df[column], index=df.index)
        .groupby(CSV_KEY)
        .sum()
        .round()
        .astype("int64")
    )


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

    def process_candidate(candidate_dict):
        if candidate_dict.get(JSON_KEY) not in series:
            return None
        candidate_dict.setdefault("raised vs spent", [{}])
        candidate_dict["raised vs spent"][0][field] = str(
            series[candidate_dict[JSON_KEY]]
        )
        return candidate_dict

    candidate_files_map(process_candidate, directory=directory)


def candidate_files_map(function, directory=DIRECTORY):
    """
    Maps a function over all the candidate JSON files and writes the returned value

    This takes a param `function` and calls that function over the parsed
    contents of all the candidate JSON files. If the function returns None,
    the contents of the candidate JSON file is unchanged. Else, the function's
    return value is written to the candidate JSON file.

    A candidate JSON file is defined as a JSON file in param `directory`
    and at the top level has a JSON object (dictionary).

    The field with its name in constant `JSON_KEY` is lower cased when
    passed to param `function`. The original case is restored when
    writing to the JSON files. 

    :param function: A function that takes a single dictionary argument and
    returns a dictionary or None.

    :param directory: String directory that will be searched for candidate JSON files.

    :returns: None.
    """
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path, "r+") as file:
            candidate_dict = json.load(file)
            if isinstance(candidate_dict, dict):
                if JSON_KEY in candidate_dict:
                    original_name = candidate_dict[JSON_KEY]
                    candidate_dict[JSON_KEY] = original_name.lower()
                new_json_dict = function(candidate_dict)
                if new_json_dict is not None:
                    if JSON_KEY in new_json_dict:
                        new_json_dict[JSON_KEY] = original_name
                    file.seek(0)
                    json.dump(new_json_dict, file, indent=2)
                    file.write("\n")
                    file.truncate()
