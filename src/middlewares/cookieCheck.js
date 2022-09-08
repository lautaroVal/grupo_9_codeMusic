module.exports = (req, res, next) => {
    if(req.cookies.remember){
        req.session.userLogin = req.cookies.remember;
    }
    next();
}