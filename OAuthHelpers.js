var CLIENT_ID = 'ABizqkrU8oOZ0xpT3638aMFCYzy6hPDJCYZTaXFauUovuHY32z';
var CLIENT_SECRET = 'mi5Av303hEduNXgnAG1DTJbnkhMkAhbin08Ea6r8';

function logRedirectUri() {
    Logger.log(getService().getRedirectUri());
}

function getService() {
    return OAuth2.createService('Quickbooks')
        // Set the endpoint URLs.
        .setAuthorizationBaseUrl('https://appcenter.intuit.com/connect/oauth2')
        .setTokenUrl('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer')
        // Set the client ID and secret.
        .setClientId(CLIENT_ID)
        .setClientSecret(CLIENT_SECRET)
        // Required, set to Accounting for this example,
        // see QB developer portal for additional options.
        .setScope('com.intuit.quickbooks.accounting')
        // Set the name of the callback function in the script referenced
        // above that should be invoked to complete the OAuth flow.
        .setCallbackFunction('authCallback')
        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getUserProperties());
}

function reset() {
    var service = getService();
    service.reset();
}

/* Handle OAuth callback */
function authCallback(request) {
    var service = getService();
    var authorized = service.handleCallback(request);

    if (authorized) {
        // Save the Company ID in the service's storage.
        service.getStorage().setValue('QuickBooks.companyId', request.parameter.realmId);

        return HtmlService.createHtmlOutput('Success!');
    } else {
        return HtmlService.createHtmlOutput('Denied');
    }
}