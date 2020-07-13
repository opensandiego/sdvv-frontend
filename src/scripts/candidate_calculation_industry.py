#!/usr/bin/env python3


import json
import pathlib

import pandas as pd

from shared_calculations import CONTRIBUTION_TYPE, CSV_PATHS, read_csv_dfs


def process_name_df(df):
    sum_series = df.groupby("Tran_Occ")["Tran_Amt2"].sum().nlargest(5)
    contribution_sum = df["Tran_Amt2"].sum()
    return pd.DataFrame(
        {
            "Tran_Amt2": sum_series,
            "contribution_percent": sum_series.map(lambda x: x / contribution_sum),
        }
    )


def process_industry_contributions(df):
    return df.groupby("Filer_NamL").apply(process_name_df)


def to_json(dataframe, key_field, directory):
    for path in pathlib.Path(directory).rglob("*.json"):
        with open(path) as f:
            file = json.load(f)
        if isinstance(file, dict) and file.get(
            key_field
        ) in dataframe.index.get_level_values(0):
            # change this to change where the donor count goes
            file.setdefault("by industry", [{}])
            value = dataframe.loc[file[key_field]].reset_index()
            file["by industry"][0] = {
                f"industry {i}": array[1].tolist()
                for i, array in enumerate(value.iterrows(), start=1)
            }
        with open(path, "w") as f:
            json.dump(file, f, indent=2)


if __name__ == "__main__":
    to_json(
        process_industry_contributions(
            read_csv_dfs(CSV_PATHS, CONTRIBUTION_TYPE, "Tran_Occ", "Tran_Amt2"),
        ),
        "committee name",
        "../assets/candidates/2020/",
    )
