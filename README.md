# BECAUSE TIMESHEETS

This little ditty posts new line items to invoices in Xero. Before it will work you must:

1. Follow Xero dev instructions here to set up your X.509 key and cert file first
2. Copy `config.sample.json` to `config.json` and enter your key, secret, and private-key path
  (probably `./privatekey.pem`)
3. Set up at least one INVENTORY item in Xero. Since Xero doesn't have payroll or time-tracking built in,
   we fake it by using inventory items for things like labor and tasks. Inventory setup is in
   `Accounts - Inventory`.
   - You could just create one called `Labor` and be done with it
   - Or, like me, you could create generic `Task 1` `Task 2` `Task 3` and so on. 
   - These items will be labels on the invoice rows, so choose things that make sense for your
     clients
4. Create a draft invoice, and give it an Invoice ID / number. You'll need that ID.

That's it for setup. Now you can add lines to existing draft invoices!

**Usage:**

- `node index.js InvoiceID ItemCode Date Rate Hours "Message"
- Use "quotes" around things that have spaces, such as the ItemCode and the Message
- The invoice must already exist and should be in draft form.

Have fun,
Billy

