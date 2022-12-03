console.log("productAdd success !");
window.addEventListener('load', () => {

  msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add("is-invalid");
  }

    let totalCharacters = 500;
    let numberCharacters = 500;
    let errores = {};

    let 
     name = $("name"),
     price = $("price"),
     discount = $("discount"),
     description = $("description"),
     category = $("category"),
     image1 = $("image1"),
     image2 = $("image2")


     name.addEventListener('focus', function (e) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
    })

    name.addEventListener('blur', (e) => {
      switch (true) {
        case !$("name").value.trim():
          errores.name = msgError("msgName", "El nombre es requerido.", e)
          break;
          case $("name").value.length < 7:
            errores.name = msgError("msgName", "El nombre debe tener como mínimo 7 caracteres.", e)
            break;
            case $("name").value.length >= 60:
              errores.name = msgError("msgName", "El nombre no puede superar los 60 caracteres.", e)
              break;
              default:
                $("msgName").innerHTML = null;
                e.target.classList.remove('is-invalid')
                e.target.classList.add('is-valid');
                delete errores.name
                break;
              }
              console.log(errores);
    })

    
    price.addEventListener('focus', function (e) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
     })

    price.addEventListener('blur', (e) => {
        switch (true) {
            case !$("price").value.trim():
              errores.price = msgError("msgPrice", "El precio es requerido.", e)
              break;
            case +$("price").value <= 0:
              errores.price = msgError("msgPrice", "El precio no puede ser 0 o negativo.", e)
              break;
            default:
              $("msgPrice").innerHTML = null;
              e.target.classList.remove('is-invalid')
              e.target.classList.add('is-valid');
              delete errores.price
              break;
          }
          console.log(errores);
    })

    discount.addEventListener('focus', function (e) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
     })

    discount.addEventListener('blur', (e) => {
        console.log(typeof $("discount").value);
        switch (true) {
            case !$("discount").value: 
            $("msgDiscount").innerHTML = null;
            e.target.classList.remove('is-invalid')
            break;
            case +$("discount").value < 0:
              errores.discount = msgError("msgDiscount", "El descuento no puede ser negativo.", e)
              break;
              case +$("discount").value > 100:
                errores.discount = msgError("msgDiscount", "El descuento no puede ser mayor a 100.", e)
              break;
            default:
              $("msgDiscount").innerHTML = null;
              e.target.classList.remove('is-invalid')
              e.target.classList.add('is-valid');
              delete errores.discount
              break;
            }
            console.log(errores);
    })

    description.addEventListener('blur', (e) => {
        console.log("hola mundo");
        switch (true) {
            case !description.value.trim():
              errores.description = msgError("msgDescription", "La descripción es requerida.", e)
              break;
            case description.value.trim().length < 20:
              errores.description = msgError("msgDescription", "La descripción debe tener 20 caracteres como mínimo.", e)
              break;
              case description.value.trim().length >= 500:
              errores.description = msgError("msgDescription", "La descripción no puede superar 500 caracteres.", e)
              break;
            default:
              $("msgDescription").innerHTML = null;
              e.target.classList.remove('is-invalid');
              e.target.classList.add('is-valid');
              delete errores.description
              break;
            }
            console.log(errores);
    })

    description.addEventListener("keyup", function (e) {
   
        numberCharacters = totalCharacters -  +this.value.length
    
       $('numberCharacters').innerHTML =  numberCharacters;
    
       if(numberCharacters <= 0){
        $('descriptionInfo').hidden = true;
         msgError("msgDescription", "La descripción no debe superar los 500 caracteres.", e)
       }else if (numberCharacters > 480) {
        $('descriptionInfo').hidden = true;
         msgError("msgDescription", "La descripción debe tener 20 caracteres como mínimo.", e)
       }else {
        $('descriptionInfo').hidden = false;
        e.target.classList.remove('is-invalid');
        e.target.classList.remove('is-valid');
        $("msgDescription").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
    }
  })

    category.addEventListener('focus', function (e) {
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
     })

    category.addEventListener('blur', (e) => {
        switch (true) {
            case !category.value.trim():
              errores.category = msgError("msgCategory", "Debe seleccionar una categoría", e)
              break;
            default:
              $("msgCategory").innerHTML = null;
              e.target.classList.remove('is-invalid')
              e.target.classList.add('is-valid');
              delete errores.category
              break;
          }
          console.log(errores);
    })

    image1.addEventListener('change', (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            $('imageView').src = reader.result;
            $("msgImg").innerHTML = null;
            delete errores.image1
          }
    })

    image2.addEventListener('change', (e) => {
        const files = e.target.files
        imgs = [$('imageView1'),$('imageView2'),$('imageView3')];
        
        if (files.length) {
          try {
             
          let reader1 = new FileReader();
           reader1.readAsDataURL(files[0]);
          reader1.onload = () => {
            imgs[0].src = reader1.result
          }
        
            const reader2 = new FileReader();
            reader2.readAsDataURL(files[1]);
            reader2.onload = () => {
              imgs[1].src = reader2.result
            }
          
          const reader3 = new FileReader();
          reader3.readAsDataURL(files[2]);
          reader3.onload = () => {
            imgs[2].src = reader3.result             
          }
        
        } catch (error) {
          imgs[2].src = "https://avalos.sv/wp-content/uploads/295-default-featured-image.png" 
        }
        }

        /* for (const file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader);
                for (let i = 0; i < files.length; i++) {  
                        imgs[0].src = reader.result 
                  }  

            }
        } */

    })

    
    $('form_add').addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = [name,price,description,category];
      //console.log(Object.keys(errores));
      
      if ($('imageView').src == "https://avalos.sv/wp-content/uploads/295-default-featured-image.png") {
        errores.image1 = msgError("msgImg", "La imagen principal es requerida.", e)
          } 

      for (let i = 0; i < inputs.length ; i++) {
        
        if(inputs[i].value.length == 0  || Object.keys(errores).length >= 1){
          console.log(inputs[i].value.length);
          inputs[i].classList.contains('is-valid') || inputs[i].classList.add("is-invalid");
          $('msgError').innerText = "Debes completar bien los campos requeridos.";
          $('msgError').style.color = "red"
          } else {
            $('form_add').submit()
          }   
    }
  })


      
})