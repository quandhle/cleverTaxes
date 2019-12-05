function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('Run Reports')
        .addItem('Get trial balance', 'getTrialBalance')
        .addItem('Get general ledger', 'getGeneralLedger')
        .addItem('Get transaction list', 'getTransactionList')
        .addItem('Get balance sheet', 'getBalanceSheet')
        .addItem('Get income statement', 'getProfitAndLoss')
        .addToUi();
}
  
function fetchData(sheetName, reportType) {
    var service = getService();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
    
    if (service.hasAccess()) {
        var companyId = service.getStorage().getValue('QuickBooks.companyId');    
        // var companyId = '4620816365024996790';
        var url = 'https://sandbox-quickbooks.api.intuit.com/v3/company/' + companyId + '/reports/' +
        reportType + '?date_macro=This Fiscal Year-to-date';
        var response = UrlFetchApp.fetch(url, {
        headers: {
            Authorization: 'Bearer ' + service.getAccessToken(),
            Accept: 'application/json'
        }
        });
        var result = JSON.parse(response.getContentText());
        
        importData(result, sheetName);
    } else {
        // If not authorized, get authorization URL.
        var authorizationUrl = service.getAuthorizationUrl();
        // View the Log to obtain the URL.
        Logger.log('Open the following URL and re-run the script: %s',
            authorizationUrl);
    }
}
  
function importData(result, name) {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    importRow(result.Columns.Column);
    boldHeaders();
    
    if (name === 'Trial Balance') {
        importTrialBalanceRows(result.Rows.Row);
    } else if (name === 'Transaction List') {
        importTransactionListRows(result.Rows.Row);
    } else if (name === 'Balance Sheet') {
        importTwoColumnSheet(result.Rows.Row);
    } else if (name === 'Income Statement') {
        importTwoColumnSheet(result.Rows.Row);
    } else if (name === 'General Ledger') {
        importGeneralLedgerRows(result.Rows.Row);
    }
}
  