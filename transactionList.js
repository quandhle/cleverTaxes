function importTransactionListRows(rows) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    for (var i = 0; i < rows.length; i++) {
        importRow(rows[i].ColData);
    }
}
  
function formatTransactionListSheet() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.getRange("C2:C").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.getRange("I2:I").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.autoResizeColumns(1, 9);
    sheet.getRange("A1:Z1").setHorizontalAlignment("center")
}
  