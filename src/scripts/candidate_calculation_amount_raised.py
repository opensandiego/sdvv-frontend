#!/usr/bin/env python3

from shared_calculations import CONTRIBUTION_TYPE, summed_contributions, to_raised_json

if __name__ == "__main__":
    to_raised_json(
        summed_contributions(
            [
                "../assets/data/netfile_api_2020.csv",
                "../assets/data/netfile_api_2019.csv",
            ],
            "Tran_Amt2",
            CONTRIBUTION_TYPE,
        ),
        "Raised",
    )
