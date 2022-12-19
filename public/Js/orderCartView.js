console.log('orederCart View Success!!');
window.addEventListener('load', async () => {

    try {
        let response = await fetch('/api/carts');
        let result = await response.json()
        console.log(result);

        if (result.ok) {
            const { products } = result.data;
            /* showCart(products) */
            if (products.length) {
                products.forEach(({product}) => {
                    $('orderCarts').innerHTML += `
                    <div>
                        <p> ${product.id} </p>
                    </div>
                    <div class="itemProduct">
                        <p class="productCart_detalleProducto_nombreProducto_bateria">${product.name} </p>
                        <img class="productCart_detalleProducto_imagenbateria" src="/img/products/${product.image}">
                    </div>
        
                    <div>
                        <button class="boton">+ 1 -</button>
                    </div>
                   <div>
                    <p class="productCart_detalleProducto_precioBateria">$${product.price}</p>
                   </div> 
                    
                    <div class="productCart_detalleProducto_basura">
                        <img class="productCart_detalleProducto_basura_img" src="/img/cart/logoBasura.png">
                    </div>
                    `
                });
            }else {
                $('rowCart').innerHTML = 'Aún no has agregado productos a tu carrito'
            }

        }
    } catch (error) {
        console.error;
    }

   /*  const showCart = (items) => {
        if (items.lenght) {
            $('orderCarts').innerHTML = null;
            items.forEach(({ quantity, product }) => {
                $('orderCarts').innerHTML += 
            });
        }
    }; */
    


});