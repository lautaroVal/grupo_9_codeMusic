console.log('orderCart success!');

const showCart = (items) => {
    if (items.lenght) {
        $('orderCarts').innerHTML = null;
        items.forEach(({ quantity, product }) => {
            $('orderCarts').innerHTML += `
            <div class="item1">
                <p class="productCart_detalleProducto_nombreProducto_bateria">Bateria Mapex</p>
                <img class="productCart_detalleProducto_imagenbateria" src="/img/Bateria-Mapex-Gris.jpg">
            </div>

            <div>
                <button class="boton">+ 1 -</button>
            </div>
           <div>
            <p class="productCart_detalleProducto_precioBateria">$109.780</p>
           </div> 
            
            <div class="productCart_detalleProducto_basura">
                <img class="productCart_detalleProducto_basura_img" src="/img/logoBasura.png">
            </div>`
        });
    }
};

$('addCart') && $('addCart').addEventListener('click', async (e) => {

    try {
        let response = await fetch('/api/Carts');
        let result = await response.json()

        if (result.ok) {
            const { items } = result.data;
            showCart(items)
        }
    } catch (error) {
        console.error;
    }

});

const addCartItem = async (productId) => {

    try {
        let response = await fetch('/api/Carts',{
            method : 'POST',
            body : JSON.stringify({
                productId
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
};

const removeCartItem = async (productId) => {

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
};


