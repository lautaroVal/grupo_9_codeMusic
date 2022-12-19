import React from 'react'
import { Row } from './Row'

export const Table = ({ products, getInfo }) => {
    return (
        <div className='table-responsive'>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    products.map((product, index) => <Row getInfo={getInfo} {...product} key={product.name + index} />)
                }

            </tbody>
        </table>
        </div>
    )
}
