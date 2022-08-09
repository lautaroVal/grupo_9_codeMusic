module.exports = {
    register: (req,res) => {
        return res.render('users/register')
    },
    login: (req,res) => {
        return res.render('users/login')
    }
}
