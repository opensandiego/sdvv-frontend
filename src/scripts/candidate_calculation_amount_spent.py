#!/usr/bin/env python3

import json
import pathlib

import pandas as pd

from shared_calculations import EXPENDITURE_TYPE, TYPE_COLUMN, filter_sum_series


def raw_contributions(spreadsheet_path):
    df = pd.concat(
        pd.read_excel(
            spreadsheet_path,
            ["D-Expenditure", "G-Expenditure", "E-Expenditure"],
            usecols=["Filer_NamL", "Amount"],
        ).values()
    ).set_index("Filer_NamL")

    return pd.Series(df["Amount"], index=df.index)


def to_json(series, key_field, directory):
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and file.get(key_field) in series:
            # change this to change where the donor count goes
            file.setdefault("raised vs spent", [{}])
            file["raised vs spent"][0]["Spent"] = series[file[key_field]]
        with open(path, "w") as f:
            json.dump(file, f, indent=2)


if __name__ == "__main__":
    to_json(
        filter_sum_series(
            raw_contributions("../assets/data/netfile_2020.xlsx"), "Filer_NamL"
        ),
        "committee name",
        "../assets/candidates/2020/",
    )
