var express = require('express');
var router = express.Router();
const {createInvoice,getInvoice,deleteInvoice} = require('../controllers/invoices');

router.get('/',getInvoice)
router.post('/',createInvoice)
router.delete('/:id',deleteInvoice)

module.exports = router;