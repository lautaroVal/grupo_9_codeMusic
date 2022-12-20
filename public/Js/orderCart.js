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

       /*  if(result.ok){
            const {items} = result.data;
            showCart(items)
        }         */
   
    } catch (error) {
        console.error
    }
};

/* const removeCartItem = async (productId) => {

    try {
        let response = await fetch('/api/Carts',{
            method : 'DELETE',
            body : JSON.stringify({
                productId,
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        let result = await response.json();

        if(result.ok){
            const {items} = result.data;
            showCart(items)
        }        

    } catch (error) {
        console.error

    }
}; */


