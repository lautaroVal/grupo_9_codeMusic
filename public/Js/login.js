console.log('login success!')
console.log(localStorage.enlace);
window.addEventListener('load', (e) => {


const msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add("is-invalid");
};
const cleanField = (element, target) => {
    $(element).innerText = null;
    target.classList.remove('is-invalid', 'is-valid')
};
const validField = (element,{target}) => {
    cleanField(element, target)
}

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

//let form = $('login_form');


    $('email').addEventListener('blur', async function(e){
        switch (true) {
            case !this.value.trim():
                msgError("msgEmail","Debes ingresar un email", e);
                break;
            case !exRegEmail.test(this.value):
                msgError("msgEmail","El email tiene un formato inválido", e);
                break
            default:
                validField("msgEmail",e)
                break;
        }
    });
    
    $('email').addEventListener('focus', function({target}){
        cleanField('msgEmail', target);
        if (qs(".login_errors")) {
            qs(".login_errors").innerHTML = null;
        }
    });

    $('password').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                msgError('msgPassword',"Debes ingresar un contraseña", e);
                break;
            default:
                validField('msgPassword',e)
                break;
        }
    });

    $('password').addEventListener('focus', function({target}){
        cleanField('msgPassword', target);
        if (qs(".login_errors")) {
            qs(".login_errors").innerHTML = null;
        }
    });


})