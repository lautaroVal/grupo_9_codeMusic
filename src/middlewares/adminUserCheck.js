/* module.exports = (req, res, next) =>{
if(req.session.userLogin && req.session.userLogin.rol === "1"){
    next()
}else{
    res.redirect('/')
}
}
 */
module.exports = (req,res,next) => !req.session.userLogin ? next() : res.redirect('/')