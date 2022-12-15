import React from 'react'

export const Info = ({ name, price, discount, description, brand, category, image, color }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5>Información</h5>
            </div>
            <div className="card-body">
                <img className='img-thumbnail' src="https://http2.mlstatic.com/D_NQ_NP_675452-MLA46334653505_062021-O.webp" alt=""/>
                <ul className="list-group list-group-flush">
                    <li class="list-group-item">
                        <label>Nombre:</label>
                        <p className='m-0'><b>{name}</b></p>
                    </li>
                    <li class="list-group-item">
                        <label>Marca:</label>
                        <p className='m-0'><b>{brand?.name}</b></p>
                    </li>
                    <li class="list-group-item">
                        <label>Categoría:</label>
                        <p className='m-0'><b>{category?.name}</b></p>
                    </li>
                    <li class="list-group-item">
                        <label>Descripción:</label>
                        <p className='m-0'><b>{description}</b></p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
