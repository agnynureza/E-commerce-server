var express = require('express');
var router = express.Router();
const {createAdmin,showUser,updateUser,deleteUser,signUp,signIn} = require('../controllers/users');
const {auth}        = require('../middleware/auth')


//user
router.post('/users/signup',signUp)
router.post('/users/signin',signIn)

//admin
router.post('/admin',createAdmin)
// router.post('/users',auth,showUser)

//role admin or user with same id , can update,delete data
router.put('/users/:id',auth,updateUser)
router.delete('/users/:id',auth,deleteUser)


module.exports = router;
