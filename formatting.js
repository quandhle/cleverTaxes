function addBorder() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    
    sheet.getRange(lastRow, 1, 1, lastCol).setBorder(true, null, null, null, null, null, 'black', SpreadsheetApp.BorderStyle.SOLID).setFontWeight('bold');
}
  
function boldHeaders() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();
    
    sheet.getRange(lastRow, 1, 1, lastCol).setFontWeight('bold');
}
  
/* Importing for simple sheets (i.e Balance Sheet and Income Statement) */
function importTwoColumnSheet(rows) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].Header) {
            importRow(rows[i].Header.ColData);
        }
        
        if (rows[i].Rows) {
            if (rows[i].Rows.Row.ColData) {
                importRow(rows[i].Rows.Row.ColData);
            } else {
                importTwoColumnSheet(rows[i].Rows.Row);
            }
        } else if (rows[i].ColData) {
            importRow(rows[i].ColData);
        }
        
        if (rows[i].Summary) {
            importSummary(rows[i].Summary.ColData, '');
        }
    }
}
  
/* Formatting for simple sheets */
function formatSimpleSheets() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.getRange("B2:B").setNumberFormat("$#,##0.00;$(#,##0.00)");
    sheet.autoResizeColumns(1, 2);
}