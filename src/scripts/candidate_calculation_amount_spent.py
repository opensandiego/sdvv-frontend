#!/usr/bin/env python3
"""
Calculates the amount spent by each candidate by summing expenditures
from column `Calculated_Amount` in the CSV files and stores it in the
candidate JSON files under field `file["raised vs spent"][0]["Spent"]`.

The summed contributions are rounded to the nearest whole number.
"""

from shared_calculations import (
    CSV_PATHS,
    EXPENDITURE_TYPE,
    summed_contributions,
    to_raised_json,
)

if __name__ == "__main__":
    to_raised_json(
        summed_contributions(CSV_PATHS, EXPENDITURE_TYPE, "Calculated_Amount"), "Spent",
    )
