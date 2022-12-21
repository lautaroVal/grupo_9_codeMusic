console.log('orderCart success!');

const notAdd =() => {
        alert("Debes loguearte para poder agregar productos a tu carrito")
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

