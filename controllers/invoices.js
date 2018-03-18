const invoices = require('../models/invoices')

module.exports = {
    createInvoice: (req, res) => {
      let invoice = {
        user_id : req.body.user_id,
        item_id : req.body.item_id
      }
      invoices
      .create(invoice)
      .then(transactions => {
        res.status(200).json({
          message       : 'Success to insert create invoice',
          transactions  : transactions
        })
      })
      .catch(err => {
        res.status(201).json({
            message : `error create invoice ${err}`
        })
      })
    },
    getInvoice: (req, res) => {
        invoices 
        .find({ 'user_id': req.body.user_id })
        .exec()
        .then(data=>{
            res.status(200).json({
                message: 'its your invoices',
                invoice:data
            })
        }).catch(err=>{
            res.status(400).json({
                message : 'sorry invalid get invoices'
            })
        })
    },
    deleteInvoice: (req, res) => {
        invoices
        .remove({ '_id': req.params.id })
        .then(transactions => {
            res.status(200).json({
            message       : 'Success to delete record',
            transactions  : transactions
            })
        }).catch(err => {
            res.status(400).json({
                message : 'sorry invalid get invoices'
            })
        })
    }
}
