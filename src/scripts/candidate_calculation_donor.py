#!/usr/bin/env python3

import pandas as pd

from shared_calculations import (
    CONTRIBUTION_TYPE,
    CSV_PATHS,
    read_csv_dfs,
    to_raised_json,
)


def donors(paths):
    df = read_csv_dfs(paths, CONTRIBUTION_TYPE, "Tran_NamL", "Tran_NamF")
    return df.apply(lambda x: x.str.cat(sep=" "), axis=1)


def num_of_unique_values_by_index(series):
    def series_count(index):
        donor_names = series[index]
        if isinstance(donor_names, pd.Series):
            return donor_names.unique().size
        return 1

    unique_indexes = series.index.unique()
    values = unique_indexes.map(series_count)
    return pd.Series(values, unique_indexes)


if __name__ == "__main__":
    to_raised_json(num_of_unique_values_by_index(donors(CSV_PATHS)), "Donors")
