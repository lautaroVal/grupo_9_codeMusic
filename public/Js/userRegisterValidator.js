console.log('productAdd success!')

window.addEventListener('load', () => {
    const msgError = (element, msg, event) => {
        $(element).style.color = "red";
        $(element).innerHTML = msg;
        event.target.classList.add("is-invalid");
    };
    const cleanField = (element, target) => {
        $(element).innerText = '';
        target.classList.remove('is-invalid', 'is-valid')
    };
    const validField = (element,{target}) => {
        cleanField(element, target)
        target.classList.add('is-valid');
        
    };
 /*    const verifyEmail = async (email) => {
        //llamado a la API
        try {
            const data = JSON.stringify({
                email : email
            });
    
            let response = await fetch('/api/users/verify-email',{
                method : 'POST',
                body : data,
                headers : {
                    'Content-Type': 'application/json' 
                }
        });
    
            let result = await response.json();
    
            console.log(result.data)
    
            return result.data
            
        } catch (error) {
            console.error
        }
    } */ //esto todavia no lo toque...
    const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    const exRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/


    $("nombre").addEventListener('blur', (e) => {
        switch (true) {
            case !$("nombre").value.trim():
                msgError("msgNombre", "El nombre es requerido.", e)
                break;
            case $("nombre").value.length < 3:
                msgError("msgNombre", "El nombre debe tener como mínimo 7 caracteres.", e)
                break;
            case $("nombre").value.length >= 60:
                msgError("msgNombre", "El nombre no puede superar los 60 caracteres.", e)
                break;
            default:
                $("msgNombre").innerHTML = null;
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid');
                break;
        }
    })
    $('nombre').addEventListener('focus', function({target}){
        cleanField('msgNombre', target)
    });

    $("apellido").addEventListener('blur', (e) => {
        switch (true) {
            case !$("apellido").value.trim():
                msgError("msgApellido", "El nombre es requerido.", e)
                break;
            case $("apellido").value.length < 3:
                msgError("msgApellido", "El nombre debe tener como mínimo 7 caracteres.", e)
                break;
            case $("apellido").value.length >= 60:
                msgError("msgApellido", "El nombre no puede superar los 60 caracteres.", e)
                break;
            default:
                $("msgApellido").innerHTML = null;
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid');
                break;
        }
    })
    $('apellido').addEventListener('focus', function({target}){
        cleanField('msgApellido', target)
    });

    $('Email').addEventListener('blur', async function(e){
        switch (true) {
            case !this.value.trim():
                msgError('errorEmail',"El email es obligatorio", e);
                break;
            case !exRegEmail.test(this.value):
                msgError('errorEmail',"El email tiene un formato inválido", e);
                break
      /*       case await verifyEmail(this.value):
                msgError('errorEmail',"El email ya se encuentra registrado", e);
                break */
            default:
                validField('errorEmail',e)
                break;
        }
    });
    
    $('Email').addEventListener('focus', function({target}){
        cleanField('errorEmail', target)
    });

    $('password').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                msgError('msgPassword',"La contraseña es obligatoria", e);
                break;
            case !exRegPass.test(this.value):
                msgError('msgPassword',"La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial", e);
                break
            default:
                validField('msgPassword',e)
                break;
        }
    });
    
    $('password').addEventListener('focus', function({target}){
        cleanField('msgPassword', target)
    });
    
    $('password2').addEventListener('blur', function(e){
        switch (true) {
            case !this.value.trim():
                msgError('msgPassword2',"Debes confirmar tu contraseña", e);
                break;
            case this.value !== $('password').value:
                msgError('msgPassword2',"Las contraseñas no coinciden", e);
                break
            default:
                validField('msgPassword2',e)
                break;
        }
    });
    
    
    $('password2').addEventListener('focus', function({target}){
        cleanField('msgPassword2', target)
    });

    $('terminos').addEventListener('click', (e) => {
        $('errorTerms').innerText = null
    });

})