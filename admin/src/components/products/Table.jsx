import React from "react";
import { Paginator } from "./Paginator";
import { Row } from "./Row";

export const Table = ({ products, getInfo, pagination, getData }) => {
  return (
    <>
      <Paginator pages={pagination.pages} total={pagination.total} next={pagination.next} 
            prev={pagination.prev} page={pagination.page} getData={getData}/>
      
      <div className="table-responsive">
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
            {products.map((product, index) => (
              <Row getInfo={getInfo} {...product} key={product.name + index} />
            ))}
          </tbody>
        </table>
      </div>
      
      <Paginator position="justify-content-end" pages={pagination.pages} total={pagination.total} next={pagination.next} prev={pagination.prev} page={pagination.page}/>
    </>
  );
};
