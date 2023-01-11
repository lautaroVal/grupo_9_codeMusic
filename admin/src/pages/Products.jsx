import React, { useEffect, useState } from 'react'
import { Info } from '../components/products/Info';
import { Table } from '../components/products/Table';
import { UseFetch } from '../hooks/UseFetch';

export const Products = () => {

  const [products, setProducts] = useState({
    loading: true,
    data: [],
    pages: 0,
    prev: null,
    next:null
  });

  const getData = async (endpoint) => {
    await UseFetch(endpoint)
      .then(({ meta, data }) => {

        if (meta.ok) {
          setProducts({
            loading: false,
            data: data.products,
            pages: data.totalPages,
            total: data.totalProducts,
            prev: data.prev,
            next: data.next,
            page: data.page
          })
        }
      }).catch(() => console.error)
  }

  useEffect(() => {
    getData('/products')
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
                    products={products.data} pagination={products} getData={getData}
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
