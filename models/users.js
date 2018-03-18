const mongoose = require('mongoose')
const Schema   = mongoose.Schema 
      
const userSchema = new Schema({
    username : String,
    password : String,
    role     : String,
    item_id:{
        type:Schema.Types.ObjectId,
        ref:'Item'
    }  
})      

module.exports = mongoose.model('User',userSchema);

