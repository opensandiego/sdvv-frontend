#!/usr/bin/env python3
"""
Reads and updates the candidate JSON files from the candidate spreadsheet.

Reads the information from the speadsheet (https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/)
and generates or updates the candidate JSON files. This updates the:
candidate name,
first name,
last name,
description,
website,
in general,
and commitee name fields.
"""
import json
import math
import os
import typing

import pandas as pd


def replace_nan(value, replace):
    """Returns the value if the value is not NaN, else returns replace."""
    try:
        if math.isnan(value):
            return replace
    except TypeError:
        pass
    return value


def read_candidate_csv(file):
    """
    Reads a Pandas Dataframe from a CSV file with candidate information.

    If the row is completely empty, drops it.

    :param file: A CSV file path (including URLS) or object that has
    the columns being read.
    :returns: The Pandas Dataframe with the CSV files information
    """
    return (
        pd.read_csv(
            file,
            usecols=(
                "Description",
                "Website",
                "Candidate_Name",
                "Committee Name (Filer_Name)",
                "Office",
                "In General",
                "District",
                "Year",
            ),
        )
        .dropna(how="all")
        .set_index("Candidate_Name")
    )


def normalize(string, nan_replacement=None):
    """
    Normalizes strings by replacing spaces with underscores and lowercases it.

    If nan_replacement is not None, NaN values are replaced with it.

    :param string: A str to be normalized.
    :param nan_replacement: The optional value NaN values are replaced with.
    :returns: The string or the nan_replacement
    """
    try:
        if nan_replacement is not None and math.isnan(string):
            return nan_replacement
    except TypeError:
        pass
    return string.replace(" ", "_").lower()


class JsonFilesNT(typing.NamedTuple):
    """Named tuple that contains the contents of a JSON file and the file's path."""

    contents: dict
    path: str


def generate_json_files(base_directory, candidate_df):
    """
    Creates empty candidate JSON files in a folder.

    :param base_directory: The str path of the directory all the files
    and folders will be generated in.
    :param candidate_df: The Pandas Dataframe the data will be taken from.
    :returns: A dictionary with the candidate name as the key and the
    value being the corrosponding JsonFilesNT.
    """
    files = {}
    for candidate in candidate_df.index:
        office_folder = normalize(candidate_df.loc[candidate]["Office"], "other")
        council_folder = (
            f"district_{candidate_df.loc[candidate]['District']}"
            if replace_nan(candidate_df.loc[candidate]["District"], False)
            else ""
        )
        name = normalize(candidate)
        year = replace_nan(candidate_df.loc[candidate]["Year"], "other")
        dir_path = f"{base_directory}/{year}/{office_folder}/{council_folder}/{name}/"
        os.makedirs(dir_path, exist_ok=True)
        json_path = f"{dir_path}{name}.json"
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


def update_json_files(folder_path, csv_url):
    """
    Generates and updates candidate JSON files in a folder.

    :param folder_path: The str path of the folder the JSON files will be in.
    :param csv_url: The str url of the CSV file that the data will be taken from.
    :returns: None
    """
    csv_df = read_candidate_csv(csv_url)
    files = generate_json_files(folder_path, csv_df)
    for candidate in csv_df.index:
        json_dict, path = files[candidate]
        json_dict["candidate name"] = candidate
        json_dict["first"] = candidate.split(" ")[0]
        json_dict["last"] = candidate.split(" ")[-1]
        json_dict["description"] = replace_nan(csv_df.loc[candidate]["Description"], "")
        json_dict["website"] = replace_nan(csv_df.loc[candidate]["Website"], "")
        json_dict["committee name"] = replace_nan(
            csv_df.loc[candidate]["Committee Name (Filer_Name)"], ""
        )

        json_dict["in general"] = (
            replace_nan(csv_df.loc[candidate]["In General"], "").lower() == "yes"
        )

        with open(path, "w") as f:
            json.dump(json_dict, f, indent=2)
            f.write("\n")


if __name__ == "__main__":
    update_json_files(
        "../assets/candidates/",
        "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0",
    )
