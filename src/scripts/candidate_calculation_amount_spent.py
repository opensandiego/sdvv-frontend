#!/usr/bin/env python3

from shared_calculations import (
    CSV_PATHS,
    EXPENDITURE_TYPE,
    summed_contributions,
    to_raised_json,
)

if __name__ == "__main__":
    to_raised_json(
        summed_contributions(CSV_PATHS, "Calculated_Amount", EXPENDITURE_TYPE), "Spent",
    )
