function auth(req,res,next){
    const authHeader = req.header('Authorization');
    const key = 'qweasd123'
    if (authHeader == key){
        // res.status(401)
        next();
    
    }else{
        res.status(401)
        res.send({
            message:'unauthorized'
        })
    }
   
}

module.exports = auth;