const jwt =  require('jsonwebtoken')
const auth = async(req,res,next)=>{
    try{
        let token = req.headers['x-auth-token']
        if(!token)
            token= req.headers['x-auth-Token']
        if(!token){
            return res.status(401).send({msg:"Token is Required"});
        }
        let decodedToken = jwt.verify(token)
        if(!decodedToken){
            return res.status(401).send({status:false,msg:"Authentication failed"
            })
        }
        req.autherID = decodedToken.autherID
        next()
    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}

module.exports.auth = auth