const bcrypt     = require('bcrypt')
const saltRounds = 10
const jwt        = require('jsonwebtoken')
const salt       = bcrypt.genSaltSync(saltRounds);
const user     = require('../models/users')
      

module.exports = {
    createAdmin : (req,res)=>{
        const hash = bcrypt.hashSync(req.body.password, salt);
        user
        .create({
            username : req.body.username,
            password : hash,
            role     : 'admin'
        },(err,data)=>{
            if(err){
                res.status(500).send({
                    message : 'failed create admin',
                    data:{}
                })
            }else{
                res.status(200).json({
                    message : 'create admin success',
                    data:data
                })
            }
        })
    },
    showUser : (req,res)=>{
        user
        .find()
        .populate('item_id')
        .exec()
        .then(data=>{
            res.status(200).json({
                message : 'users data',
                data:data
            })
        }).catch(err=>{
            res.status(400).json({
                message : `sorry error load users data ${err}`,
                data: {}
            })
        })
    },
    updateUser: (req,res)=>{
        let id = req.params.id
        user
        .update({_id:id},{$set:req.body})
        .then(data=>{
            res.status(201).json({
                message: 'update user data success',
                data:data
            })
        }).catch(err=>{
            res.status(400).json({
                message:`erorr update data ${err}`,
                data: {}
            })
        })
    },
    deleteUser:(req,res)=>{
        let id = req.params.id
        user
        .deleteOne({_id:id})
        .then(data=>{
            res.status(201).json({
                message :'delete user success'
            })
        })
    },
    signUp:(req,res)=>{
        const hash = bcrypt.hashSync(req.body.password, salt);
        user
        .create({
            username : req.body.username,
            password : hash,
            role     : 'user'
        },(err,data)=>{
            if(err){
                res.status(500).json({
                    message : 'failed create user',
                    data:{}
                })
            }else{
                res.status(200).json({
                    message : 'create user success',
                    data:data
                })
            }
        })
    },
    signIn:(req,res)=>{
        user
        .findOne({username:req.body.username})
        .exec()
        .then(data=>{
            let passwordCheck = bcrypt.compareSync(req.body.password, data.password);
            if(passwordCheck){
                let token =jwt.sign({id:data._id,username:data.username,role:data.role}, 'rahasia')
                res.status(200).json({
                    message : `login success`,
                    token:token 
                })
            }else{
                res.status(400).json({
                    message:'password incorrect',
                    data:{}
                })
            }
        }).catch(err=>{
            res.status(400).json({
                message:`username incorrect `,
                data:{}
            })
        })
    }
}