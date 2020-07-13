import json
import pathlib

import pandas as pd

CONTRIBUTION_TYPE = "RCPT"
EXPENDITURE_TYPE = "EXPN"

TYPE_COLUMN = "Rec_Type"

CSV_KEY = "FilerName"
JSON_KEY = "committee name"

DIRECTORY = "../assets/candidates/2020/"

CSV_PATHS = (
    "../assets/data/netfile_api_2020.csv",
    "../assets/data/netfile_api_2019.csv",
)


def read_csv_dfs(paths, calc_type, *columns):
    columns += (CSV_KEY, TYPE_COLUMN)
    df = pd.concat(
        pd.read_csv(path, usecols=columns).set_index(CSV_KEY) for path in paths
    )
    filtered_df = df[df[TYPE_COLUMN] == calc_type]
    return filtered_df.drop(columns=[TYPE_COLUMN])


def summed_contributions(paths, column, calc_type):
    df = read_csv_dfs(paths, calc_type, TYPE_COLUMN, column,)
    return pd.Series(df[column], index=df.index).groupby(CSV_KEY).sum()


def to_py_type(value):
    """ Converts numpy types to normal types"""
    if type(value).__module__ == "numpy" and hasattr(value, "item"):
        return value.item()
    return value


def to_raised_json(series, field, directory=DIRECTORY):
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and file.get(JSON_KEY) in series:
            file.setdefault("raised vs spent", [{}])
            file["raised vs spent"][0][field] = to_py_type(series[file[JSON_KEY]])
        with open(path, "w") as f:
            json.dump(file, f, indent=2)
