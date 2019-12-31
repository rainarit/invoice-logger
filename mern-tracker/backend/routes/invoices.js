
const router = require('express').Router();
let Invoice = require('../models/invoice.model');

router.route('/').get((req, res) => {
  Invoice.find()
    .then(invoices => res.json(invoices))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const invoiceNumber = req.body.invoiceNumber;
  const paymentDate = Date.parse(req.body.paymentDate);
  const customerName = req.body.customerName;
  const amount = Number(req.body.amount);
  const totalPaid = Number(req.body.totalPaid);
  const datePaid = Date.parse(req.body.datePaid);

  const newInvoice = new Invoice({
    username,
    invoiceNumber,
    paymentDate,
    customerName,
    amount,
    totalPaid,
    datePaid,
  });

  newInvoice.save()
    .then(() => {
        return res.json('Invoice added!');
    })
    .catch(err => {
        return res.status(400).json('Error: ' + err);
    });
});

router.route("/:id").get((req, res) => {
  Invoice.findById(req.params.id)
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Invoice.findByIdAndDelete(req.params.id)
    .then(() => res.json("Invoice deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Invoice.findById(req.params.id)
    .them(invoice => {
      invoice.username = req.body.username;
      invoice.invoiceNumber = req.body.invoiceNumber;
      invoice.paymentDate = req.body.paymentDate;
      invoice.customerName = req.body.customerName;
      invoice.amount = req.body.amount;
      invoice.totalPaid = req.body.totalPaid;
      invoice.datePaid = req.body.datePaid;

      invoice.save()
        .then(() => res.json("Invoice updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;