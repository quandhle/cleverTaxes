function importGeneralLedgerRows(row) {
    for (var i = 0; i < row.length; i++) {
        if (row[i].Header) {
            importRow(row[i].Header.ColData);
        }
        
        if (row[i].Rows) {
            importLedgerRow(row[i].Rows.Row);
        }
        
        importSummary(row[i].Summary.ColData, 'General Ledger');
    }
}
  
function importLedgerRow(row) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();

    if (row[0].ColData) {
        for ( var i = 0; i < row.length; i++ ) {
            importRow(row[i].ColData);
        }
    } else {
        for (var i = 0; i < row.length; i++) {
            importRow(row[i].Header.ColData)
            importLedgerRow(row[i].Rows.Row);
            importSummary(row[i].Summary.ColData, 'General Ledger')
        }
    }
}
  
function formatGeneralLedgerSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.getRange("G1:G").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.getRange("H1:H").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.getRange("B2:K").setHorizontalAlignment('right');
    sheet.autoResizeColumns(1,8);
    sheet.getRange("A1:Z1").setHorizontalAlignment("center")
}
  