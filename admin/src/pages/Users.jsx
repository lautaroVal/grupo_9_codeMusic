import React from 'react'
import { useState,useEffect } from 'react';
import {UseFetch} from '../hooks/UseFetch'
import { Table } from '../components/users/Table';

export const Users = () => {

  const [state, setState] = useState({
    loading: true,
    data: []
  })

  useEffect(() => {
    UseFetch('/users')
    .then(({meta, users}) => {

      if (meta.ok) {
        setState({
          loading: false,
          data: users,
        })
      }
    }).catch(() => console.error)
  }, [])

  return (
    <div className='container'>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Usuarios</h1>
					</div>
      <div className="row">
        <div className="col-8">
          <div className="card">          
            <div className="card-body">
              {
                state.loading
                  ?
                  <p>cargando...</p>
                  :
                  <Table
                    users={state.data}/>
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
