#!/usr/bin/env python3
"""
Sums the contributions to all candidates and writes it to
`campaign_race_totals.json` as a string.
The sum is rounded to the nearest whole number.
"""

from shared_calculations import CONTRIBUTION_TYPE, CSV_PATHS, DIRECTORY, read_csv_series


def sum_candidate_contributions():
    """
    Sum of the contributions to each candidates.

    :returns: A rounded, integer sum of the contributions to all candidates
    """
    return int(round(read_csv_series(CSV_PATHS, CONTRIBUTION_TYPE, "Tran_Amt2").sum()))


def to_json(contribution_sum, path=DIRECTORY + "campaign_race_totals.json"):
    """
    Write the sum of all contributions as a string to `campaign_race_totals.json`

    :param contribution_sum: An integer sum of candidate contributions

    :param path: The file name  the candidate JSON files are found
    in. Defaults to file "campaign_race_totals.json" under constant `DIRECTORY`.

    :returns: None.
    """
    with open(path, "w") as file:
        file.write(str(contribution_sum))


if __name__ == "__main__":
    to_json(sum_candidate_contributions())
