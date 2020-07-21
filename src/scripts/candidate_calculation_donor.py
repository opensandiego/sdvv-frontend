#!/usr/bin/env python3
"""
Calculates the number of unique donors each candidate has and stores it in
the candidate JSON files under field `file["raised vs spent"][0]["Donors"]`.
"""

import pandas as pd

from shared_calculations import (
    CONTRIBUTION_TYPE,
    CSV_PATHS,
    read_csv_dfs,
    to_raised_json,
)


def donors(paths):
    """
    Read the donor names from CSV paths `paths` into a returned series
    with the index being the name of the committee they donated to.

    :param paths: Iterable of file objects or paths.

    :returns: A pandas Series with the index being the commitee the
    donor donated to and the values being the donor's (last first) name.
    """
    df = read_csv_dfs(paths, CONTRIBUTION_TYPE, "Tran_NamL", "Tran_NamF")
    return df.apply(lambda x: x.str.cat(sep=" "), axis=1)


def num_of_unique_values_by_index(series):
    """
    Counts unique values by index in a pandas series.

    :param series: A pandas series.

    :returns: A pandas series with the index column being the unique
    indexes from arg `series` and the values being the count of the
    indexes values.
    """

    def series_count(index):
        donor_names = series[index]
        if isinstance(donor_names, pd.Series):
            return donor_names.unique().size
        return 1

    unique_indexes = series.index.unique()
    values = unique_indexes.map(series_count)
    return pd.Series(values, index=unique_indexes)


if __name__ == "__main__":
    to_raised_json(num_of_unique_values_by_index(donors(CSV_PATHS)), "Donors")
