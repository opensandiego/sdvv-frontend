import json
import pathlib

import pandas as pd

CONTRIBUTION_TYPE = "RCPT"
EXPENDITURE_TYPE = "EXPN"

TYPE_COLUMN = "Rec_Type"

CSV_KEY = "FilerName"
JSON_KEY = "committee name"

DIRECTORY = "../assets/candidates/2020/"


def read_csv_dfs(paths, *columns, index_column=CSV_KEY):
    columns += (index_column,)
    return pd.concat(
        pd.read_csv(path, usecols=columns).set_index(index_column) for path in paths
    )


def summed_contributions(
    paths, column, calc_type, *, type_column=TYPE_COLUMN, index_column=CSV_KEY
):
    df = read_csv_dfs(paths, type_column, column, index_column=index_column)
    filtered_df = df[df[type_column] == calc_type]
    return (
        pd.Series(filtered_df[column], index=filtered_df.index)
        .groupby(index_column)
        .sum()
    )


def to_raised_json(series, field, *, directory=DIRECTORY, json_key=JSON_KEY):
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and file.get(json_key) in series:
            # change this to change where the donor count goes
            file.setdefault("raised vs spent", [{}])
            file["raised vs spent"][0][field] = series[file[json_key]]
        with open(path, "w") as f:
            json.dump(file, f, indent=2)
