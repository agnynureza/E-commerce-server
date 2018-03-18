const item = require('../models/items')

module.exports = { 
    addItem: (req, res) => {
      let item = {
        name        : req.body.name,
        image       : req.file.cloudStoragePublicUrl,
        quantity    : req.body.quantity,
        price       : req.body.price,
        description : req.body.description
      }

      item
      .create(item)
      .then(items => {
        res.status(200).json({
          message : 'Success to add new item',
          item   : items
        })
      })
      .catch(err => {
        res.status(201).json({
            message:`failed add item ${err} `
        })
      })
    },
    readItem: (req, res) => {
        item
        .find()
        .populate('user_id')
        .exec()
        .then(data=>{
            res.status(201).json({
                message: 'success list item',
                items : data
            })
        }).catch(err=>{
            res.status(201).json({
                message:`failed add item ${err} `
            })
        })
    },
    updateItem: (req, res) => {
        let item = {
            name        : req.body.name,
            image       : req.file.cloudStoragePublicUrl,
            quantity    : req.body.quantity,
            price       : req.body.price,
            description : req.body.description
        }
        item
        .findByIdAndUpdate({ '_id': req.params.id }, { $set: item })
        .then(items => {
            res.status(200).json({
                message : 'Success to update item',
                items   : items
            })
        })
        .catch(err => {
            res.status(201).json({
                message:`failed add item ${err} `
            })
        })
    },
    deleteItem: (req, res) => {
        item
        .remove({ '_id': req.params.id })
        .then(items => {
            res.status(200).json({
                message : 'Success to delete item',
                items   : items
            })
        }).catch(err => {
            res.status(201).json({
                message:`failed add item ${err} `
            })
        })
    }
}
