const mongoose = require('mongoose')
const Schema   = mongoose.Schema 
      
const invoiceSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId, 
        ref: 'User'
    },
    item_id:{
        type:Schema.Types.ObjectId,
        ref:'Item'
    }
})      

module.exports = mongoose.model('Invoice',invoiceSchema);