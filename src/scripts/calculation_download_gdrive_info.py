#!/usr/bin/env python3
import json
import math
import os
from urllib import request

import pandas as pd


def replace_nan(value, replace):
    try:
        if math.isnan(value):
            return replace
    except TypeError:
        pass
    return value


def update_json_files(folder_path, sheet_url):
    os.makedirs(folder_path, exist_ok=True)
    with request.urlopen(sheet_url) as f:
        csv_df = (
            pd.read_csv(f, usecols=("Description", "Website", "Candidate_Name"))
            .dropna(how="all")
            .set_index("Candidate_Name")
        )
    for candidate in csv_df.index:
        description = replace_nan(csv_df.loc[candidate]["Description"], "")
        website = replace_nan(csv_df.loc[candidate]["Website"], "")
        path = "{}{}.json".format(folder_path, candidate)
        try:
            json_file = open(path)
        except FileNotFoundError:
            json_dict = {}
        else:
            with json_file as f:
                json_dict = json.load(f)
        json_dict["candidate name"] = candidate
        json_dict["description"] = description
        json_dict["website"] = website
        with open(path, "w") as f:
            json.dump(json_dict, f)


if __name__ == "__main__":
    update_json_files(
        "../assets/data/candidates/",
        "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0",
    )
