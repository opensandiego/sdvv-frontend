CONTRIBUTION_TYPE = "RCPT"
EXPENDITURE_TYPE = "EXPN"

TYPE_COLUMN = "Rec_Type"


def filter_sum_series(series, key):
    return series.groupby(key).sum()
