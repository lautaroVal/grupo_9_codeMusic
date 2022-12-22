import React, { useEffect, useState } from 'react'
import { Info } from '../components/products/Info';
import { Table } from '../components/products/Table';
import { UseFetch } from '../hooks/UseFetch';

export const Products = () => {

  const [products, setProducts] = useState({
    loading: true,
    data: []
  });

  useEffect(() => {
    UseFetch('/products')
      .then(({ meta, data }) => {

        if (meta.ok) {
          setProducts({
            loading: false,
            data
          })
        }
      }).catch(() => console.error)

  }, []);
  
  const [product, setProduct] = useState([]);


  const getInfo = (id) => {
    UseFetch(`/products/${id}`)
      .then(({ meta, data }) => {

        if (meta.ok) {
          setProduct(
            data
            )
          //console.log(data);
        }
      }).catch(() => console.error)
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h5>Productos</h5>
            </div>
            <div className="card-body">
              {
                products.loading
                  ?
                  <p>cargando...</p>
                  :
                  <Table
                    products={products.data}
                    getInfo={getInfo}
                  />
              }
            </div>
          </div>
        </div>
        <div className="col-4">
           {
            <Info
            {...product}
          />

          } 
        </div>
      </div>

    </div>
  )
}
