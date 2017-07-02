# TIME-XERO: Because timesheets.

![Screenshot](https://raw.githubusercontent.com/billyc/xero-tracker/master/scrnshot.png)

This little ditty posts new line items to invoices in Xero. It is just a node.js command line tool -- no UI. 

```bash
$ node index.js INV-0010 "Task 1" 2017.07.04 150 8.0 "Grilled eggplant for company picnic"
```

Xero doesn't have payroll or time-tracking built in; they want you to buy add-on products. Gross! So, let's fake it by using *inventory items* for things like labor and tasks. Once it's set up, you can add nicely formatted rows to your invoices by calling a bash one-liner.

**Setup**

1. Follow [Xero dev instructions](https://developer.xero.com/documentation/api-guides/create-publicprivate-key) to set up your X.509 key and cert file first - these are used to authenticate.
2. On developer.xero.com go to `My Apps` and `Add Application` for your organization. Set it up as
   follows
   - Private Application
   - Upload a new X.509 certificate
   - Paste in the contents of the `publickey.cer` file that you just created in step 1, agree to
     terms, and click Save
   - Click `SHOW` on the key and secret fields, you'll need to copy them in the next step.
2. Rename `config.sample.json` to `config.json` and enter your key and secret from above, and make sure the private-key path is correct too (probably `./privatekey.pem`)
3. Back in your Xero account, set up at least one INVENTORY item. Since Xero doesn't have payroll or time-tracking built in,
   we fake it by using inventory items for things like labor and tasks. Inventory setup is in
   `Accounts - Inventory`.
   - You could just create one called `Labor` and be done with it
   - Or, like me, you could create generic `Task 1` `Task 2` `Task 3` and so on. 
   - Ignore all of the fields and checkboxes in the Inventory setup page -- just give the item a name and click Save.
   - These items will be visible labels on the invoice rows, so choose things that make sense for your
     clients.
4. Create a draft invoice for each client you'll be billing time, noting the Invoice ID for each. You'll need that ID.

That's it for setup. Now you can add lines to existing draft invoices!

**Usage:**

```bash
$ node index.js InvoiceID ItemCode Date Rate Hours "Message"
# Example:
# node index.js INV-0010 "Task 1" 2017.07.04 150 8.0 "Grilled eggplant for company picnic"
```

- The invoice must already exist and should be in draft (editable) status.
- Use "quotes" around things that have spaces, such as the ItemCode and the Message
- The date field is just plain text so format it however you want -- use quotes if it has spaces, e.g. `"May 1, 2017"`
- For now, everything gets dumped into the Sales account (code 400) and tax is set to `Tax Exempt`. Modifying those is your homework.

Have fun,
Billy

