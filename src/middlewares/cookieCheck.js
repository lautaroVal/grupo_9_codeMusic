module.exports = (req, res, next) => {
    if(req.cookies.codeMusic){
        req.session.userLogin = req.cookies.codeMusic
    }
    next();
}