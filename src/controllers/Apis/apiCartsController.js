const db = require('../../database/models');

module.exports = {

    list: async (req, res) => {
        try {

            return res.status(200).json({
                ok: true,
                data: req.session.orderCart || null
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upps, un error!'
            });
        }
    },

    addItem: async (req, res) => {

        try {

            const { productId } = req.body; /* Este body viene de lo que envíamos desde el onclick del botón de agregar al carrito */

            await db.Cart.create({
                quantity: 1,
                productId,
                orderId: req.session.orderCart.id
            })

            let { id, name, price, discount, image } = await db.Product.findByPk(productId);

            req.session.orderCart = {
                ...req.session.orderCart,
                products: [
                    req.session.orderCart.products,
                    {
                        id,
                        name,
                        price,
                        discount,
                        image: image.file
                    }
                ]
            }

            return res.status(200).json({
                ok: true,
                data: req.session.orderCart || null
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upps, un error!'
            });
        }



        /* try {
            const { productId } = req.body;
            let item = req.session.orderCart.items.find(item => item.product.id === +productId);
            
            if (item) {

                await db.Cart.update(
                    {
                        quantity: item.quantity + 1
                    },
                    {
                        where: {
                            id: item.id
                        }
                    }
                )
                const itemsModify = req.session.orderCart.items.map(element => {
                    if (element.id === item.id) {
                        element.quantity = element.quantity + 1;
                        return element
                    }
                    return element
                })

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items: itemsModify
                }

            } else {
                const newCartItem = await db.Cart.create({
                    quantity: 1,
                    productId,
                    orderId: req.session.orderCart.id
                });

                const cartItem = await db.Cart.findByPk(newCartItem.id, {
                    attributes: ['id', 'quantity'],
                    include: [
                        {
                            association: 'product',
                            attributes: ['id', 'name', 'price', 'discount', 'image']
                        }
                    ]
                })

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items: [
                        ...req.session.orderCart.items,
                        cartItem
                    ]
                }
            }

            return res.status(200).json({
                ok: true,
                data: req.session.orderCart || null
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upps, un error!'
            });
        } */
    },

    removeItem: async (req, res) => {

        /*    try {
               const { productId } = req.body;
               let item = req.session.orderCart.items.find(item => item.product.id === +productId);
   
               if (item.quantity === 1) {
                   await db.Cart.destroy({
                       where: {
                           id: item.id
                       }
                   });
   
                   const itemsModify = req.session.orderCart.items.filter(element => element.id !== item.id)
   
                   req.session.orderCart = {
                       ...req.session.orderCart,
                       items: itemsModify
                   }
   
               } else {
                   await db.Cart.update(
                       {
                           quantity: item.quantity - 1
                       },
                       {
                           where: {
                               id: item.id
                           }
                       }
                   )
   
                   const itemsModify = req.session.orderCart.items.map(element => {
                       if (element.id === item.id) {
                           element.quantity = element.quantity - 1;
                           return element
                       }
                       return element
                   })
   
                   req.session.orderCart = {
                       ...req.session.orderCart,
                       items: itemsModify
                   }
               }
   
               return res.status(200).json({
                   ok: true,
                   data: req.session.orderCart || null
               })
   
           } catch (error) {
               return res.status(error.status || 500).json({
                   ok: false,
                   msg: error.message || 'Upps, un error!'
               });
           } */
    },

    removeAllItem: async (req, res) => {

    }
}