The data available in NetFile is generated from the Electronic Filing System. 
  Each form that is E-Filed is assigned a unique Filing ID. 
  If the Filing ID is known then the form in PDF format can be viewed by replacing <FilingId> in the url below with the Filing ID. This is useful to compare the downloaded data with the form. Expect for very recently filed forms the Filing ID will be show in red in the Date Stamp area near the top of the first page of the PDF.

  Filing lookup: https://netfile.com/connect2/api/public/image/<FilingId>

  Example: https://netfile.com/connect2/api/public/image/185639436

  The committee that submitted the E-Filing has a unique I.D. Number that will be shown near the top right on most pages of the PDF. The committee is also know as the Filer.
  The filing in PDF can have a summary page and multiple schedules i.e. Schedule A, Schedule E, Schedule F. Each schedule contains transactions of a particular type. The number of pages in the PDF will vary depending on the amount and type of transactions. If there are no transactions of a particular type then the PDF will not contain the schedule used for those transactions. It is important to not confuse the filer with the filing. The filer is the committee and the form that the committee submitted is the filing.

  The transaction data for the City of San Diego can be downloaded from https://public.netfile.com/pub2/?aid=CSD. The xlsx file that is downloaded is separated into multiple sheets. The names of the sheets correspond with the type of transactions and match the schedule from the filing. For example A-Contributions sheet contain data from Schedule A of California form 460. Several of the sheets have data from form 460 but there are also sheets for data from other forms. In the xlsx data the Filer_ID column is for the ID of the committee. The xlsx data does not contain a column for the FilingId.


The NetFile data can also be downloaded using the public data API's.
  https://netfile.com/Connect2/api/swagger-ui/#!/public

The data used to generate the files netfile_api_2019.csv and netfile_api_2020.csv is generated from:
  /public/campaign/export/cal201/transaction/year/csv

The resulting csv files are each formatted as a single data set. They are not separated by transaction type.

To determine the transaction type of the netfile_api_20NN.csv type files filter the "Form_Type" column for the letter of the schedule. This works for transactions from Schedules A, C, I, D, G and E. The csv file also contains transaction data from other forms and has values in the "Form_Type" column such as "F496", "F497P1", and "F497P2".

As an example, to find all transactions from Schedule A
  netfile_2020.xlsx > sheet "A-Contributions"
  netfile_api_2020.csv > filter column "Form_Type" for value "A"

Not all column names from the xlsx download match those in the csv file. Consult the list below to identify the names of the columns 
in the xlsx file and the matching column names in the csv file.

Column name mapping
  netfile_2020.xlsx <=> netfile_api_2020.csv
  Filer_NamL <=> FilerName
  Tran_NamF <=> Tran_NamF
  Tran_NamL <=> Tran_NamL
  Tran_Occ <=> Tran_Occ
  Tran_Amt2 <=> Tran_Amt2
  Amount <=> Calculated_Amount

