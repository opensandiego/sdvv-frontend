#!/usr/bin/env python3
"""
Sums the contributions for all candidates in each race by election year
(mayor, city council, city attorney) and writes it to
/src/assets/candidates/{year}/campaign_race_totals.json as a JSON object.

The keys are "mayor", "city council", and "city attorney" respectively.
The key "last update" is the string date of when it was last updated,
in MM/DD/YY format.

The sum is rounded to the nearest whole number.
"""

import datetime
import glob
import json
import os
import pathlib
from typing import NamedTuple

from shared_calculations import DIRECTORY


class CandidateRaceContributionSums(NamedTuple):
    """
    The sums of the candidates' contributions for each race.

    This also includes a last updated date.
    """

    mayor: int
    city_council: int
    city_attorney: int
    last_update: datetime.date


def directories_under(path):
    """ An iterator of the directories directly under `path` """
    return (folder.name for folder in os.scandir(path) if folder.is_dir())


def sum_race_contributions(
    base_directory=DIRECTORY,
    mayor_directory="mayor",
    city_council_directory="city_council*",
    city_attorney_directory="city_attorney",
):
    """
    Sums the contributions for each race by election year.

    :param base_directory: The directory containing folders for each election year

    These directories support taking a glob pattern for multiple directories.
    These are under `base_directory` in the format
    "base_directory/*/directory_parameter".

    :param mayor_directory: The directory the mayoral race candidate JSON
    files are in.

    :param city_council_directory: The directory the city council race
    candidate JSON files are in.

    :param city_attorney_directory: The directory the city attorney race
    candidate JSON files are in.

    :returns: A dictionary with the string election year as the key and
    a `CandidateRaceContributionSums` object as the value.
    """
    year_sums = {}
    for year in directories_under(base_directory):
        sums = []
        for directory in (
            mayor_directory,
            city_council_directory,
            city_attorney_directory,
        ):
            rounded_sum = 0
            expanded_paths = glob.iglob(f"{base_directory}/{year}/{directory}")
            for path in expanded_paths:
                for json_file_path in pathlib.Path(path).rglob("*.json"):
                    with open(json_file_path) as file:
                        candidate_dict = json.load(file)
                        if "raised vs spent" in candidate_dict:
                            rounded_sum += int(
                                candidate_dict["raised vs spent"][0]["Raised"]
                            )
            sums.append(rounded_sum)
        year_sums[year] = CandidateRaceContributionSums(*sums, datetime.date.today())

    return year_sums


def to_json(contribution_sums, path=DIRECTORY, file_name="campaign_race_totals.json"):
    """
    Writes the race contributions to `campaign_race_totals.json`

    :param contribution_sums: A dictionary with keys of the election year
    and values of the corresponding `CandidateRaceContributionSums` object.

    :param path: The path that contains folders for each election year.

    :param file_name: The name of the output file

    :returns: None.
    """
    for year, contribution_sums in contribution_sums.items():
        race_sums = {
            "mayor": str(contribution_sums.mayor),
            "city council": str(contribution_sums.city_council),
            "city attorney": str(contribution_sums.city_attorney),
            "last update": contribution_sums.last_update.strftime("%m/%d/%Y"),
        }
        with open(f"{path}/{year}/{file_name}", "w") as file:
            json.dump(race_sums, file, indent=2)
            file.write("\n")


if __name__ == "__main__":
    to_json(sum_race_contributions())
