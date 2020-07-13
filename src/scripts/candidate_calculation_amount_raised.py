#!/usr/bin/env python3

from shared_calculations import (
    CONTRIBUTION_TYPE,
    CSV_PATHS,
    summed_contributions,
    to_raised_json,
)

if __name__ == "__main__":
    to_raised_json(
        summed_contributions(CSV_PATHS, "Tran_Amt2", CONTRIBUTION_TYPE), "Raised",
    )
