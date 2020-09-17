#!/usr/bin/env python3
"""
This calculates the average donation to each candidate and writes it to
the candidate JSON files at `file["raised vs spent"][0]["Average Donor"]`.
It's written as a string, and is rounded to the nearest whole number.
"""


from shared_calculations import (
    CONTRIBUTION_TYPE,
    DIRECTORY,
    CSV_PATHS,
    JSON_KEY,
    candidate_files_map,
    read_csv_series,
)


def average_donation(series):
    """
    Calculate the average contribution to a candidate.

    :param series: A pandas Series with the index being the candidate's commitee
    names and the values being the contributions to the candidate.

    :returns: A pandas series with the candidate's name as the index
    and the average being the value.
    """
    return series.groupby(level=0).mean()


def to_json(series, directory=DIRECTORY):
    """
    Writes the average contribution series the the candidate JSON files

    The average contribution is written to
    `file["raised vs spent"][0]["Average Donor"]` as a string.
    The average contribution is rounded to the nearest whole number.

    :param series: The keys are the candidates' commitee names and the
    values are the average contribution/donation amount.

    :param directory: The directory the candidate JSON files are found
    in. Defaults to constant `DIRECTORY`.

    :returns: None.
    """

    def process_candidate(candidate_dict):
        if candidate_dict.get(JSON_KEY) not in series:
            return None
        # int call is required due to rounding on numpy values not converting to an int
        candidate_dict["raised vs spent"][0]["Average Donor"] = str(
            int(round(series[candidate_dict[JSON_KEY]]))
        )
        return candidate_dict

    candidate_files_map(process_candidate, directory=DIRECTORY)


if __name__ == "__main__":
    to_json(
        average_donation(read_csv_series(CSV_PATHS, CONTRIBUTION_TYPE, "Tran_Amt2"))
    )
