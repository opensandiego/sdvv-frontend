#!/usr/bin/env python3
import json

import pandas as pd

# TODO: Do I output all of these to a single json file or multiple json files?
# TODO: Do I need to lowercase the names?


def num_unique_names(spreadsheet_path):
    return len(
        pd.concat(
            pd.read_excel(
                spreadsheet_path,
                ["A-Contributions", "C-Contributions", "I-Contributions"],
                usecols=["Tran_NamL", "Tran_NamF"],
            ).values()
        )
        .apply(lambda x: x.str.cat(sep=" "), axis=1)
        .unique()
    )


def update_json(spreadsheet_path, json_path):
    unique_values = num_unique_names(spreadsheet_path)
    with open(json_path, "w") as f:
        json.dump(unique_values, f)


if __name__ == "__main__":
    update_json(
        "../assets/data/netfile_2020.xlsx",
        "../assets/data/donor_candidate_calculation.json",
    )
