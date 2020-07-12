#!/usr/bin/env python3

import json
import pathlib

import pandas as pd

from shared_calculations import CONTRIBUTION_TYPE, TYPE_COLUMN


def donors(spreadsheet_path):
    return (
        pd.concat(
            pd.read_excel(
                spreadsheet_path,
                ["A-Contributions", "C-Contributions", "I-Contributions"],
                usecols=["Tran_NamL", "Tran_NamF", "Filer_NamL"],
            ).values()
        )
        .set_index("Filer_NamL")
        .apply(lambda x: x.str.cat(sep=" "), axis=1)
    )


def num_of_unique_values_by_index(series):
    def series_count(index):
        try:
            unique = series[index].unique()
        except AttributeError:
            return 1
        return unique.size

    values = series.index.unique().map(series_count)
    return pd.Series(values, series.index.unique())


def to_json(series, key_field, directory):
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and key_field in file and file[key_field] in series:
            # change this to change where the donor count goes
            file.setdefault("raised vs spent", [{}])
            value = series[file[key_field]]
            # This is to convert numpy types into their python version
            file["raised vs spent"][0]["Donors"] = (
                value.item() if hasattr(value, "item") else value
            )
        with open(path, "w") as f:
            json.dump(file, f, indent=2)


if __name__ == "__main__":
    to_json(
        num_of_unique_values_by_index(donors("../assets/data/netfile_2020.xlsx")),
        "committee name",
        "../assets/candidates/2020/",
    )
