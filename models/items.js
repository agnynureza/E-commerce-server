const mongoose = require('mongoose')
const Schema   = mongoose.Schema 
      
const itemSchema = new Schema({
    name        : String,
    image       : String,  
    quantity    : String,
    price       : String,
    description : String,
    user_id     : {
        type:Schema.Types.ObjectId, 
        ref: 'User'
    }   
})      

module.exports = mongoose.model('Item',itemSchema);

