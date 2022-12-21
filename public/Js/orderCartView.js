console.log('orederCart View Success!!');

const showCart = (items) => {
    if (items.length) {
        $('orderCarts').innerHTML = null;
        items.forEach(({product, quantity, i}) => {
            $('orderCarts').innerHTML += `
            <div class="item1">
                <p> ${product.id} </p>
            </div>

            <div class="item2">
                <p class="productCart_detalleProducto_nombreProducto_bateria">${product.name} </p>
                <img class="productCart_detalleProducto_imagenbateria" src="/img/products/${product.image}">
            </div>

            <div>
            <div class="item3">
                <button class="botonAdd" onclick="addCartItem('${product.id}')">+</button>
                <input type="text" value="${quantity}" />
                <button class="botonSubtract" onclick="removeCartItem('${product.id}')">-</button>
            </div>
            </div>

           <div class="item4">
            <p class="productCart_detalleProducto_precioBateria">$${product.price}</p>
           </div> 
           <div class="item5">
            <p class="productCart_detalleProducto_precioBateria">$${result = product.price * quantity}</p>
           </div> 
            <div class="item6">
                <img class="productCart_detalleProducto_basura_img" src="/img/cart/logoBasura.png">
            </div>
            `
            $('total').innerHTML = `Total $${result }`
            
        });
    }else {
        $('orderCarts').innerHTML = ` <p class="alert alert-warning ms-5">Aún no has agregado productos a tu carrito.</p>`
    }

}

window.addEventListener('load', async () => {
    try {
        let response = await fetch('/api/carts');
        let result = await response.json()
        console.log(result);

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

        if (result.ok) {
            const { items } = result.data;
            showCart(items)
        }
   
    } catch (error) {
        console.error
    }
};

const removeCartItem = async (productId) => {

    try {
        let response = await fetch('/api/carts',{
            method : 'DELETE',
            body : JSON.stringify({
                productId,
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        let result = await response.json(); 
        console.log(result);

        if (result.ok) {
            const { items } = result.data;
            showCart(items)
        }

    } catch (error) {
        console.error
    }

};




