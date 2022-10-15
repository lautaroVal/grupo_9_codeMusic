const db = require('../database/models');
const sequelize = db.sequelize;
const users = db.user;

const usersController = {
    register: function (req, res) {
        return res.render('users/register', {
            title: 'Register'
        })
    },

    processRegister: (req, res) => {
        const {firstName, lastName, email, telephone, password, password2} = req.body;
        Users.create({
            firstName,
            lastName,
            email,
            telephone, 
            password,
            password2
        })
        .then(user => {
            console.log(user)
            return res.redirect('/login')
        })

        .catch(error => console.log(error));
        }
    // },

    // login: (req, res) => {
    //     return res.render('users/login', {
    //         firstName: 'Login'
    //     })
    // },

    // processLogin: (req, res) => {
    //     let errors = validationResult(req);
    //     if (errors.isEmpty()) {

    //         let { id, firstName, lastName, email, telephone, category, avatar } = loadUsers().find(user => user.email === req.body.email);

    //         req.session.userLogin = {
    //             id,
    //             firstName,
    //             lastName,
    //             email,
    //             telephone,
    //             category,
    //             avatar
    //         };

    //         if (req.body.remember) {
    //             res.cookie('codeMusic', req.session.userLogin, {
    //                 maxAge: 1000 * 60 * 60
    //             })
    //         };

    //         return res.redirect('/')
    //     } else {
    //         return res.render('users/login', {
    //             title: 'Login',
    //             errors: errors.mapped()
    //         })
    //     }
    }

module.exports = usersController;