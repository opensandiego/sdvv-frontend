#!/usr/bin/env python3
"""
Calculates how many candidates are in the race for each office

This calculates how many candidates are in the race for each office
and writes them to "src/assets/candidates/campaign_candidate_totals.json".
Its format is {"office": "count"}. The office is lowercased and the count is
a string.

It takes its data from the source google sheet
(https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/).
"""
from shared_calculations import GOOGLE_SHEET_URL, read_candidate_csv

OUTPUT_TEMPLATE_PATH = "../assets/candidates/{year}/campaign_candidate_totals.json"


def to_json(count_series, output_template_path=OUTPUT_TEMPLATE_PATH):
    """
    Outputs candidate count series to a JSON file with two spaces as the indent

    The series's values are converted to strings

    :param count_series: The series to be written. It should have a MultiIndex
    with two levels, the first representing the year and the second
    representing the office

    :param output_template_path: The path of the JSON file, with "year"
    as a format specifier for the election year.

    :returns: None
    """
    count_series = count_series.astype(str)
    count_series.index.levels[0].map(
        lambda year: count_series[year].to_json(
            output_template_path.format(year=year), indent=2
        )
    )


def candidate_count(csv_path=GOOGLE_SHEET_URL):
    """
    Calculates how many candidates are in the race for each office by year

    :param csv_path: The path or file object of the source CSV file
    with the candidate information. Accepts URLs.

    :returns: A Pandas series. Its index is a MultiIndex with the first
    level being "Year" and the second level being "Office". The office's
    name lower cased. The values are integer counts of how many candidates
    are running for that office in that year.
    """
    count = read_candidate_csv(csv_path)
    count["Office"] = count["Office"].str.lower()
    return count.groupby(["Year", "Office"]).size()


if __name__ == "__main__":
    to_json(candidate_count())
