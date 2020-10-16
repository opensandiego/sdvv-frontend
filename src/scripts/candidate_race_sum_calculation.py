#!/usr/bin/env python3
"""
Sums the contributions for all candidates in each race
(mayor, city council, city attorney) and writes it to
`campaign_race_totals.json` as a JSON object.

The keys are "mayor", "city council", and "city attorney" respectively.
The key "last update" is the string date of when it was last updated,
in MM/DD/YY format.

The sum is rounded to the nearest whole number.
"""

import datetime
import glob
import json
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


def sum_race_contributions(
    mayor_directory=DIRECTORY + "*/mayor/",
    city_council_directory=DIRECTORY + "*/city_council*/",
    city_attorney_directory=DIRECTORY + "*/city_attorney/",
):
    """
    Sums the contributions for each race.

    :param mayor_directory: The directory the mayoral race candidate JSON
    files are in. Supports taking a glob pattern for multiple directories.

    :param city_council_directory: The directory the city council race
    candidate JSON files are in. Supports taking a glob pattern for
    multiple directories.

    :param city_attorney_directory: The directory the city attorney race
    candidate JSON files are in. Supports taking a glob pattern for
    multiple directories.

    :returns: A `CandidateRaceContributionSums` object.
    """
    sums = []
    for directory in (mayor_directory, city_council_directory, city_attorney_directory):
        rounded_sum = 0
        expanded_paths = glob.iglob(directory)
        for path in expanded_paths:
            for json_file_path in pathlib.Path(path).rglob("*.json"):
                with open(json_file_path) as file:
                    candidate_dict = json.load(file)
                    if "raised vs spent" in candidate_dict:
                        rounded_sum += int(
                            candidate_dict["raised vs spent"][0]["Raised"]
                        )
        sums.append(rounded_sum)
    return CandidateRaceContributionSums(*sums, datetime.date.today())


def to_json(contribution_sums, path=DIRECTORY + "campaign_race_totals.json"):
    """
    Writes the race contributions to `campaign_race_totals.json`

    :param contribution_sums: A CandidateRaceContributionSums object

    :param path: The file name the candidate JSON files are found
    in. Defaults to file `campaign_race_totals.json` under constant `DIRECTORY`.

    :returns: None.
    """
    race_sums = {
        "mayor": str(contribution_sums.mayor),
        "city council": str(contribution_sums.city_council),
        "city attorney": str(contribution_sums.city_attorney),
        "last update": contribution_sums.last_update.strftime("%m/%d/%Y"),
    }
    with open(path, "w") as file:
        json.dump(race_sums, file, indent=2)
        file.write("\n")


if __name__ == "__main__":
    to_json(sum_race_contributions())
