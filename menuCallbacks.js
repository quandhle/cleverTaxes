function getGeneralLedger() {
    fetchData('General Ledger', 'GeneralLedger');
    formatGeneralLedgerSheet();
}
  
function getTrialBalance() {
    fetchData('Trial Balance', 'TrialBalance');
    formatTrialBalanceSheet();
}
  
function getProfitAndLoss() {
    fetchData('Income Statement', 'ProfitAndLoss');
    formatSimpleSheets();
}
  
function getBalanceSheet() {
    fetchData('Balance Sheet', 'BalanceSheet');
    formatSimpleSheets();
}
  
function getTransactionList() {
    fetchData('Transaction List', 'TransactionList');
    formatTransactionListSheet();
}
  