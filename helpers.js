/* General function for importing summary */
function importSummary(summary, type) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var summaryInfo = [];
    
    for (var i = 0; i < summary.length; i++) {
        summaryInfo.push(summary[i].value);
    }
    
    if (type === 'General Ledger') {
        var hold = summaryInfo[summaryInfo.length - 2];
        summaryInfo[summaryInfo.length - 2] = summaryInfo[summaryInfo.length - 1];
        summaryInfo[summaryInfo.length - 1] = hold;
    }
    
    sheet.appendRow(summaryInfo);
    
    addBorder();
}

/* General function for importing header and row data */
function importRow(data) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var dataInfo = [];
    
    for (var i = 0; i < data.length; i++) {
        if (data[i].value || data[i].value === '') {
            dataInfo.push(data[i].value);
        } else if (data[i].ColTitle || data[i].ColTitle === '') {
            dataInfo.push(data[i].ColTitle);
        }
    }
    
    sheet.appendRow(dataInfo)
}
  