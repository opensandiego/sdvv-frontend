#!/usr/bin/env python3
import json
import math
import os
import typing
from urllib import request

import pandas as pd


def replace_nan(value, replace):
    try:
        if math.isnan(value):
            return replace
    except TypeError:
        pass
    return value


def read_candidate_csv(file):
    return (
        pd.read_csv(
            file,
            usecols=(
                "Description",
                "Website",
                "Candidate_Name",
                "Committee Name (Filer_Name)",
                "Office",
            ),
        )
        .dropna(how="all")
        .set_index("Candidate_Name")
    )


def normalize(string, nan_replacement=None):
    try:
        if nan_replacement is not None and math.isnan(string):
            return nan_replacement
    except TypeError:
        pass
    return string.replace(" ", "_").lower()


class JsonFilesNT(typing.NamedTuple):
    contents: dict
    path: str


def generate_json_files(base_directory, candidate_csv):
    files = {}
    for candidate in candidate_csv.index:
        dir_path = "{}{}/{}/".format(
            base_directory,
            normalize(candidate_csv.loc[candidate]["Office"], "other"),
            normalize(candidate),
        )
        os.makedirs(dir_path, exist_ok=True)
        json_path = "{}{}.json".format(dir_path, normalize(candidate))
        try:
            file = open(json_path)
        except FileNotFoundError:
            with open(json_path, "w") as f:
                f.write("{}")
            json_dict = {}
        else:
            with file as f:
                json_dict = json.load(f)
        files[candidate] = JsonFilesNT(json_dict, json_path)

    return files


def update_json_files(folder_path, sheet_url):
    with request.urlopen(sheet_url) as f:
        csv_df = read_candidate_csv(f)
    files = generate_json_files(folder_path, csv_df)
    for candidate in csv_df.index:
        json_dict, path = files[candidate]
        json_dict["candidate name"] = candidate
        json_dict["description"] = replace_nan(csv_df.loc[candidate]["Description"], "")
        json_dict["website"] = replace_nan(csv_df.loc[candidate]["Website"], "")
        json_dict["committee name"] = replace_nan(
            csv_df.loc[candidate]["Committee Name (Filer_Name)"], ""
        )
        with open(path, "w") as f:
            json.dump(json_dict, f)


if __name__ == "__main__":
    update_json_files(
        "../assets/candidates/2020/",
        "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0",
    )
