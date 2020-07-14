# NetFile Data

The NetFile data is generated from California's Electronic Filing System. 

Each form that is E-Filed is assigned a unique Filing ID. The filing in PDF format can be viewed by replacing {FilingId} in the Filing lookup url below with the Filing ID. This is useful to compare the downloaded data with the form. Except for recently filed forms the Filing ID will be show in red in the Date Stamp area near the top of the first page of the PDF.

* Filing lookup: https://netfile.com/connect2/api/public/image/{FilingId}

* Example: https://netfile.com/connect2/api/public/image/185639436

The committee that submitted the E-Filing has a unique I.D. Number that will be shown near the top right on most pages of the PDF. The committee is also know as the Filer.

The filing in PDF can have a summary page and multiple schedules, for example Schedule A, Schedule E, and Schedule F. Each schedule contains transactions of a particular type. The number of pages in the PDF will vary depending on the amount and type of transactions. If there are no transactions of a particular type then the PDF will not contain the schedule used for those transactions. It is important to not confuse the **filer** with the **filing**. The **filer** is the committee and the **filing** is the form that the committee submitted.

## Transactions in xlsx from the Public Portal

* City of San Diego Public Portal for Campaign Finance Disclosure<br> https://public.netfile.com/pub2/?aid=CSD

The transaction data for the City of San Diego can be downloaded from Public Portal.  The xlsx file that is downloaded is separated into multiple sheets. The names of the sheets correspond with the type of transactions and match the schedule from the filing. For example A-Contributions sheet contain data from Schedule A of California form 460. Several of the sheets have data from form 460 but there are also sheets for data from other forms. In the xlsx data the Filer_ID column is for the ID of the committee. The xlsx data does not contain a column for the FilingId. Note that there are two export choices, **Export Amended** and **Export All**. See [Amended Transactions](#amended-transactions) for details on the difference.

## Transactions in csv from the public data API

The NetFile data can also be downloaded using the public data API's.<br>
* https://netfile.com/Connect2/api/swagger-ui/#!/public

The data used to generate the files netfile_api_2019.csv and netfile_api_2020.csv is generated from:<br>
* GET /public/campaign/export/cal201/transaction/year/csv

## Column Changes between xlsx and csv

The resulting csv files are each formatted as a single data set. They are not separated by transaction type.

To determine the transaction type of the netfile_api_20NN.csv type files filter the "Form_Type" column for the letter of the schedule. This works for transactions from Schedules A, C, I, D, G and E. The csv file also contains transaction data from other forms and has values in the "Form_Type" column such as "F496", "F497P1", and "F497P2".

As an example, to find all transactions from form 460, Schedule A
* netfile_2020.xlsx > sheet "A-Contributions"
* netfile_api_2020.csv > filter column "Form_Type" for value "A"

Not all column names from the xlsx download match those in the csv file. Consult the list below to identify the names of the columns 
in the xlsx file and the matching column names in the csv file.

Column name equivalence between xlsx download and API csv files
|netfile_2020.xlsx|netfile_api_2020.csv| PDF Filings
---|---|---
Filer_ID | FilerStateId|
Filer_NamL | FilerName|
Tran_NamF | Tran_NamF|
Tran_NamL | Tran_NamL|
Tran_Occ | Tran_Occ|
Tran_Amt1 | Tran_Amt1| AMOUNT RECEIVED THIS PERIOD (Sch A)<br>AMOUNT/FAIR MARKET VALUE (Sch C)
Tran_Amt2 | Tran_Amt2| CUMULATIVE TO DATE CALENDAR YEAR (Sch A, C)
Form_Type | Form_Type|

Source Filings: 
* PDF with FilingId=[186975787](https://netfile.com/connect2/api/public/image/186975787) compared to NetFileKey=1e6fc0bb9d8f4e67bd8bab6600f77888 in CSV.
* PDF with FilingId=[189484614](https://netfile.com/connect2/api/public/image/189484614) compared to NetFileKey=b6d04114d351483c8e10aba300e80227 in CSV.

## Applying Filters

### Calculating Committee Contributions

#### Transactions in xlsx (Excel)
Start with the Export Amended download.

Calculate the committee contributions using the xlsx (Excel) file use only sheets: A-Contributions, C-Contributions, and I-Contributions. Next filter the rows by filer_id then sum the transaction_2 (Tran_Amt2) columns from all the contribution sheets.

#### Transactions in csv from the public data API
Retrieve the csv data while using the ShowSuperceded=false query string.

Calculate the committee contributions using the csv file from the API the rows will be filtered by FilerStateId to determine each committee. Next limit column Form_Type to values: A, C and I. Then sum the Tran_Amt1 column.

## Amended Transactions
If a previously filed form needs to be updated then the form can be filed as an amendment. A filling that is an amendment will have a unique Filing ID that is different than the form that is being updated. The PDF of a 460 filing that is an amendment will have the Amendment box checked in area "2. Type of Statement" at the top of the first page. 

The amendment status applies to the entire filing not just to a single transaction. All transactions on the amendment will also be included in the NetFile data even if there were no changes to the transaction. This will cause transactions that are on the amendment and the transactions on the filing being amended to show up more than once in the NetFile data.

### Amended Transactions from the Public Portal
The **Export Amended** download from the Public Portal page excludes transactions on filings that have been amended by later filings. This excludes the duplicate transactions that may exist in the NetFile data. The downloaded file for 2020 is named: efile_newest_CSD_2020.xlsx

The **Export All** will contain the duplicate transactions from amended filings. 
The downloaded file for 2020 is named: efile_CSD_2020.xlsx

The "Report_Num" column in the xlsx files can be used to determine the amended status. The first filing that the transaction shows up on will use the value 000. It the transaction is on a filing that had been amended then the value will be incremented. 

Using the **Export Amended** eliminates the need to filter out duplicate transactions.

### Amended (Superceded) Transactions from the public data API's

The transactions in csv do not contain a column that indicates their amended status. Appending ShowSuperceded=false in the API query string can be used to filter out amended transactions. When the false value is used the request takes longer and returns less result. Using false results in the same transactions as downloading the Export Amended xlsx file. The default value for ShowSuperceded is true if omitted and includes all transactions. Using true results in the same transactions as downloading the Export All xlsx file. 


The API does have a call that can be used to get the amended status of a filing. This can be done using the API call below. 

* GET /public/filing/info/{FilingId}

For a given filing ID it will return data that include the following field:
* amendedBy => if this filing has been amended then the ID of newer filing is here
* amendmentSequenceNumber => this would correspond to the "Report_Num" column in the xlsx files
* amends => if this filing amends an existing filing then the ID of older filing is here
* filingId => this is the ID filing being queried in the API
* sosFilerId => this is the FilerStateId in the transactions csv and Filer_ID in the xlsx download

Example of initial: https://netfile.com/Connect2/api/public/filing/info/187018678
* "amendedBy": **"187550016"**,
* "amendmentSequenceNumber": 0,
* "amends": null,
* "filingId": **"187018678"**,
* "sosFilerId": "1415056",

Example of amended: https://netfile.com:443/Connect2/api/public/filing/info/187550016
* "amendedBy": null,
* "amendmentSequenceNumber": 1,
* "amends": **"187018678"**,
* "filingId": **"187550016"**,
* "sosFilerId": "1415056",

Notice how they are connected: amendedBy<=>filingId and amends<=>filingId.
