#!/usr/bin/env python3
"""
Calculates the amount raised by each candidate by summing contributions
from column `Tran_Amt1` in the CSV files and stores it in the
candidate JSON files under field `file["raised vs spent"][0]["Raised"]`.
"""

from shared_calculations import (
    CONTRIBUTION_TYPE,
    CSV_PATHS,
    summed_contributions,
    to_raised_json,
)

if __name__ == "__main__":
    to_raised_json(
        summed_contributions(CSV_PATHS, CONTRIBUTION_TYPE, "Tran_Amt1"), "Raised",
    )
