const db = require('../database/models');

const UsersDBController = {
    register: function(req, res) {
        db.User.findAll()
            .then(function(users) {
                return res.render("Registro Exitoso", {users})
            })
    },
    processRegister: function(req, res) {
        db.User.Create({
            firstName: req.body,
            lastName: req.body,
            email: req.body,
            telephone: req.body,
            password: req.body,
        });
    }
}
