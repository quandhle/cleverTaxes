function importTrialBalanceRows(rows) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].ColData) {
            importRow(rows[i].ColData);
        } else {
            importSummary(rows[i].Summary.ColData, '');
        }
    }
}
  
function formatTrialBalanceSheet() {
    var sheet = SpreadsheetApp.getActiveSheet();
    
    sheet.getRange("B2:B").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.getRange("C2:C").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.autoResizeColumns(1,3);
    sheet.getRange("A1:Z1").setHorizontalAlignment("right")
}
  