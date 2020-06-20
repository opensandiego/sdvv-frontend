#!/usr/bin/env python3
import csv
import json
from urllib import request

SHEET_URL = "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0"


def get_csv_columns(csv_dict_reader, *args):
    rows = [[] for _ in args]
    for row in csv_dict_reader:
        for i, arg in enumerate(args):
            rows[i].append(row[arg])
    return rows


def update_json_file(file_path):
    with request.urlopen(SHEET_URL) as f:
        csv_sheet = f.read()
    sheet = csv.DictReader(csv_sheet.decode("utf-8").splitlines())
    try:
        with open(file_path) as f:
            json_file = json.load(f)
    except FileNotFoundError:
        json_file = {}
    (
        json_file["candidate name"],
        json_file["description"],
        json_file["website"],
    ) = get_csv_columns(sheet, "Candidate_Name", "Description", "Website")
    with open(file_path, "w") as f:
        json.dump(json_file, f)


if __name__ == "__main__":
    update_json_file("../assets/data/candidate_information.json")
