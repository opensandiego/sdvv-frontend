#!/usr/bin/env python3

import pandas as pd


def donors(spreadsheet_path):
    return (
        pd.concat(
            pd.read_excel(
                spreadsheet_path,
                ["A-Contributions", "C-Contributions", "I-Contributions"],
                usecols=["Tran_NamL", "Tran_NamF", "Filer_NamL"],
            ).values()
        )
        .set_index("Filer_NamL")
        .apply(lambda x: x.str.cat(sep=" "), axis=1)
    )


def num_of_unique_values_by_index(series):
    def series_count(index):
        try:
            unique = series[index].unique()
        except AttributeError:
            return 1
        return unique.size

    values = series.index.unique().map(series_count)
    return pd.Series(values, series.index.unique())


if __name__ == "__main__":
    num_of_unique_values_by_index(donors("../assets/data/netfile_2020.xlsx")).to_json(
        "../assets/data/donor_candidate_calculation.json"
    )
