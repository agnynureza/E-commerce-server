var express = require('express');
var router = express.Router();
const {addItem,readItem,updateItem,deleteItem} = require('../controllers/items');
const {sendUploadToGCS} = require('../middleware/uploadGCS') 
const multer = require('multer')

const upload = multer({
   storage  : multer.memoryStorage(),
   limits   : {
     fileSize: 10*1024*1024
  } 
 })

router.get('/',readItem)
router.post('/',upload.single('item'),sendUploadToGCS,addItem)
router.put('/:id',updateItem)
router.delete('/:id',deleteItem)

module.exports = router;