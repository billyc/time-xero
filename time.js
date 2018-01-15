'use strict';

const ACCT_CODE = '400';  // 400: Sales
const TAX = 'NONE';       // NONE, INCLUSIVE, EXCLUSIVE

var fs = require('fs');
var xeronode = require('xero-node');
var config = require('./config.json');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey)
    config.privateKey = fs.readFileSync(config.privateKeyPath);

// Available application types are:
// xero.PrivateApplication
// xero.PublicApplication
// xero.PartnerApplication

if (process.argv.length < 8) {
  console.log('Usage: node time.js Rate InvoiceID TaskID "Message" Date Hours');
  process.exit(-1);
}

var UnitAmount = process.argv[2];
var InvoiceId = process.argv[3];
var ItemCode = process.argv[4];
var Description = process.argv[5];
var XDate = process.argv[6];
var Quantity = process.argv[7];

async function doit() {
  var xeroClient = new xeronode.PrivateApplication(config);
  var xero = xeroClient.core;

  var invoice = await xero.invoices.getInvoice(InvoiceId);

  var timeEntry = {
    ItemCode,
    UnitAmount,
    Quantity,
    Description: `${XDate} // ${ItemCode}\n${Description}`,
    AccountCode: ACCT_CODE,
    TaxType: TAX,
  };

  invoice.LineItems.push(timeEntry);

  await invoice.save();
}

doit().catch(err => {
  console.log("\noops -> ");
  try {
    var errStart = err.message.indexOf('ValidationErrors');
    var errEnd = err.message.indexOf('},\n',errStart);
    console.log(err.message.slice(errStart,errEnd));
  }
  catch(z) {
    console.log(z);
  }
});
