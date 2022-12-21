console.log('orderCart success!');

const notAdd =(e) => {
Swal.fire(
    'No tienes cuenta?',
    'Debes loguearte para poder agregar productos a tu carrito',
    'question'
  )
}


const addCartItem = async (productId) => {

    try {
        let response = await fetch('/api/carts',{
            method : 'POST',
            body : JSON.stringify({
                productId
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        let result = await response.json();
        console.log(result);
   
    } catch (error) {
        console.error
    }
};

const addAlert = ()=> {
    Swal.fire(
        'Producto agregado!',
        'Lo vas a encontrar en tu carrito de compras!',
        'success'
      )
}

$("delete").addEventListener("click", (e) => {
    e.preventDefault()
    Swal.fire({
        title: 'Estás seguro?',
        text: "No podras revertir una vez borrado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
                $("delete").submit()
        }
      })
})