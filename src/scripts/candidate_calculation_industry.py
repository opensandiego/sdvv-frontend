#!/usr/bin/env python3
"""
Calculates the top five industries (taken from occupations) the candidate
gets donations from, how much each industry donates, and the percentage
of all the candidate's donations the industry donates in the candidate
JSON files under field `file["by industry"][0]`.

How much each industry donates is rounded to the nearest whole number.
"""

import pandas as pd
from shared_calculations import (
    CONTRIBUTION_TYPE,
    CSV_KEY,
    CSV_PATHS,
    DIRECTORY,
    JSON_KEY,
    candidate_files_map,
    read_csv_df,
)


def process_occupation_df(df):
    """
    Return a dataframe with the top five occupations that have the the
    highest contribution (as determined by column `Tran_Amt1`) and the
    percenage of the overall contributions they contributed.

    :param df: A dataframe with columns `Tran_Occ` (the occupations) and
    summable column `Tran_Amt1` (the contributions).

    :returns: A dataframe with column `top_occupations` being the top 5
    contributions rounded to the nearest whole (int) number and column
    `contribution_percent` being the corrosponding (int) percentage of the
    total contributions they each contributed.
    """
    sum_series = (
        df.groupby("Tran_Occ")["Tran_Amt1"].sum().nlargest(5).round().astype("int64")
    )
    contribution_sum = df["Tran_Amt1"].sum()
    return pd.DataFrame(
        {
            "top_occupations": sum_series,
            "contribution_percent": sum_series.map(
                lambda x: round((x / contribution_sum) * 100)
            ),
        }
    )


def process_industry_contributions(df):
    """
    Return a dataframe with the indexes being the committee names and
    the columns being the occupation, how much the occupation donated
    to the commitee, and the percentage of toal contributions to that
    commitee their contribution was. There are five index entries for
    each committee, sorted by how much they donated.

    :param df: A dataframe with column constant `CSV_KEY`,
    column `Tran_Occ`, and column `Tran_Amt1`.

    :returns: A dataframe with index constant `CSV_KEY` and columns of
    Tran_Occ, top_occupations, and contribution_percent.
    """
    return df.groupby(CSV_KEY).apply(process_occupation_df).reset_index(level=1)


def to_json(dataframe, directory=DIRECTORY):
    """
    Updates the candidate JSON files from `dataframe` produced by
    `process_industry_contributions`.

    Updates the top donated industries (or occupations). Takes data
    returned by `process_industry_contributions` and saves them in field
    `file["by industry"][0]`.

    :param dataframe: A dataframe with index constant `CSV_KEY` and columns of
    Tran_Occ, top_occupations, and contribution_percent.

    :param directory: The directory the candidate JSON files are found
    in. Defaults to constant `DIRECTORY`.

    :returns: None.
    """

    def process_candidate(candidate_dict):
        if candidate_dict.get(JSON_KEY) not in dataframe.index:
            return None
        candidate_dict.setdefault("by industry", [{}])
        value = dataframe.loc[candidate_dict[JSON_KEY]]
        candidate_dict["by industry"][0] = {
            f"industry {i}": [str(x) for x in array[1]]
            for i, array in enumerate(value.iterrows(), start=1)
        }
        return candidate_dict

    candidate_files_map(process_candidate, directory=directory)


if __name__ == "__main__":
    to_json(
        process_industry_contributions(
            read_csv_df(CSV_PATHS, CONTRIBUTION_TYPE, "Tran_Occ", "Tran_Amt1"),
        ),
    )
