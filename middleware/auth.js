const jwt = require('jsonwebtoken')

module.exports = {
    auth:(req,res,next)=>{
        let token = req.headers.token 
        if(token){
            try{
                let decoded = jwt.verify(token,'rahasia')
                console.log(decoded)
                if(decoded.role === 'admin'|| (decoded.role==='user' && decoded._id === req.params.id)){
                    next()
                }else{
                    res.status(400).json({
                        message : 'not authorize'
                    })
                }
            }catch(err){
                res.status(400).json({
                    message : 'not authorize'
                })
            }
        }else{
            res.status(400).json({
                message :'please login first'
            })
        }
    }
}