console.log("productAdd success!");

window.addEventListener('load', () => {

  msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add("is-invalid");
  }

  let totalCharacters = 500;
  let numberCharacters = 500;

  $("name").addEventListener('blur', (e) => {
    console.log("hola mundo");
    switch (true) {
      case !$("name").value.trim():
        msgError("msgName", "El nombre es requerido.", e)
        break;
      case $("name").value.length < 7:
        msgError("msgName", "El nombre debe tener como mínimo 7 caracteres.", e)
        break;
      case $("name").value.length >= 60:
        msgError("msgName", "El nombre no puede superar los 60 caracteres.", e)
        break;
      default:
        $("msgName").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
        break;
    }
  })

  $("price").addEventListener('blur', (e) => {
    console.log("hola mundo");
    switch (true) {
      case !$("price").value.trim():
        msgError("msgPrice", "El precio es requerido.", e)
        break;
      case +$("price").value <= 0:
        msgError("msgPrice", "El precio no puede ser 0 o negativo.", e)
        break;
      default:
        $("msgPrice").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
        break;
    }
  })

  $("discount").addEventListener('blur', (e) => {
    console.log(typeof $("discount").value);
    switch (true) {
      case !$("discount").value:
        $("msgDiscount").innerHTML = null;
        e.target.classList.remove('is-invalid')
        break;
      case +$("discount").value < 0:
        msgError("msgDiscount", "El descuento no puede ser negativo.", e)
        break;
      case +$("discount").value > 100:
        msgError("msgDiscount", "El descuento no puede ser mayor a 100.", e)
        break;
      default:
        $("msgDiscount").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
        break;
    }
  })

  $("description").addEventListener('blur', (e) => {
    console.log("hola mundo");
    switch (true) {
      case !$("description").value.trim():
        msgError("msgDescription", "La descripción es requerida.", e)
        break;
      case $("description").value.trim().length < 20:
        msgError("msgDescription", "La descripción debe tener 20 caracteres como mínimo.", e)
        break;
      case $("description").value.trim().length >= 500:
        msgError("msgDescription", "La descripción no puede superar 500 caracteres.", e)
        break;
      default:
        $("msgDescription").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
        break;
    }
  })

  $("description").addEventListener("keyup", function (e) {

    numberCharacters = totalCharacters - +this.value.length

    $('numberCharacters').innerHTML = numberCharacters;

    if (numberCharacters <= 0) {
      $('descriptionInfo').hidden = true;
      msgError("msgDescription", "La descripción no debe superar los 500 caracteres.", e)
    } else if (numberCharacters > 480) {
      $('descriptionInfo').hidden = true;
      msgError("msgDescription", "La descripción debe tener 20 caracteres como mínimo.", e)
    } else {
      $('descriptionInfo').hidden = false;
      e.target.classList.remove('is-invalid');
      e.target.classList.remove('is-valid');
      $("msgDescription").innerHTML = null;
    }
  });

  $("category").addEventListener('blur', (e) => {
    switch (true) {
      case !$("category").value.trim():
        msgError("msgCategory", "Debe seleccionar una categoría", e)
        break;
      default:
        $("msgCategory").innerHTML = null;
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid');
        break;
    }
  })

  $("image1").addEventListener('change', (e) => {
    const file = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      $('imageView').src = reader.result
    }
  })

  $("image2").addEventListener('change', (e) => {
    const files = e.target.files
    imgs = [$('imageView1'), $('imageView2'), $('imageView3')]

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
         for (let i = 0; i < imgs.length; i++) { 
        imgs[0].src = reader.result
        } 
 
      }
    } */
  })

})

