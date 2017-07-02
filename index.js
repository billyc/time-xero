'use strict';

var xero = require('xero-node');
var fs = require('fs');
var config = require('./config.json');
 
//Private key can either be a path or a String so check both variables and make sure the path has been parsed. 
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);
 
// Available application types are: 
// xero.PrivateApplication 
// xero.PublicApplication 
// xero.PartnerApplication 
 
var xeroClient = new xero.PrivateApplication(config);

//Print a count of invoices 
xeroClient.core.invoices.getInvoices({
    where: 'Type=="ACCREC"',
    orderBy: 'InvoiceNumber'
})
.then(function(invoices) {
    invoices.forEach(function(invoice) {
      console.log(invoice.InvoiceID,invoice.InvoiceNumber);
    })    
}).catch(function(err) {
    console.log('wat');
    console.log(err);
    console.log('hi2');
});

