console.log("profile success!");

window.addEventListener('load', function () {
    
    const exRegAlfa = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/

    let firstName = $("firstName");
    let lastName = $("lastName");
    let avatar = $("avatar");
    let btn = $("btn-guardar");
    btn.disabled = false;

    msgError = (element, msg, event) => {
        $(element).style.color = "red";
        $(element).innerHTML = msg;
        event.target.classList.add("is-invalid");
        btn.disabled = true;
        btn.style.cursor = "initial";
        btn.style.backgroundColor = "none";
    }
    
    let errores = {};

    firstName.addEventListener('focus', function (e) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
     })
        
    firstName.addEventListener('blur', (e) => {
        switch (true) {
          case !firstName.value.trim():
            errores.firstName = msgError("msgFirstName", "El nombre es requerido.", e)
            break;
            case !exRegAlfa.test(firstName.value):
            errores.firstName = msgError("msgFirstName", "Solo se permiten caracteres alfabéticos.", e)
            break;
            case firstName.value.length < 3:
              errores.firstName = msgError("msgFirstName", "El nombre debe tener como mínimo 3 caracteres.", e)
              break;
              case firstName.value.length >= 60:
                errores.firstName = msgError("msgFirstName", "El nombre no puede superar los 60 caracteres.", e)
                break;
                default:
                  $("msgFirstName").innerHTML = null;
                  e.target.classList.remove('is-invalid')
                  e.target.classList.add('is-valid');
                  btn.disabled = false;
                  btn.style.cursor = "cursor";
                  delete errores.firstName;
                  break;
                }
                console.log(errores);
      })

      lastName.addEventListener('focus', function (e) {
        e.target.classList.remove('is-invalid');
        e.target.classList.remove('is-valid');
       })

      lastName.addEventListener('blur', (e) => {
        switch (true) {
          case !lastName.value.trim():
            errores.lastName = msgError("msgLastName", "El apellido es requerido.", e)
            break;
            case !exRegAlfa.test(lastName.value):
            errores.lastName = msgError("msgLastName", "Solo se permiten caracteres alfabéticos.", e)
            break;
            case lastName.value.length < 3:
              errores.lastName = msgError("msgLastName", "El apellido debe tener como mínimo 3 caracteres.", e)
              break;
              case lastName.value.length >= 60:
                errores.lastName = msgError("msgLastName", "El apellido no puede superar los 60 caracteres.", e)
                break;
                default:
                  $("msgLastName").innerHTML = null;
                  e.target.classList.remove('is-invalid')
                  e.target.classList.add('is-valid');
                  btn.disabled = false;
                  btn.style.cursor = "cursor";
                  delete errores.lastName;
                  break;
                }
                console.log(errores);
      })

      avatar.addEventListener('change', (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            $('avatarView').src = reader.result;
          }
    })


    $('form_profile').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = [firstName,lastName];
        console.log(Object.keys(errores));
        
  
        for (let i = 0; i < inputs.length ; i++) {
          
          if(inputs[i].value.length < 1 || Object.keys(errores).length >= 1){
            //inputs[i].value.length > 1 || console.log(inputs[i]);
            inputs[i].classList.contains('is-valid') || inputs[i].classList.add("is-invalid");
            $('msgError').innerText = "Debes completar bien los campos requeridos.";
            $('msgError').style.color = "red"
            } else {
              $('form_profile').submit()
            }   
      }
    })

})
