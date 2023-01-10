import React from "react";
import { useEffect,useState } from "react";
import { UseFetch } from "../../hooks/UseFetch";
import { Category } from "./Category";

const Categories = () => {

    const [countCat, setCountCat] = useState({
      loading:true,
      categories: []
  });

  useEffect(() => {

      UseFetch('/products')
      .then(({data}) => {
          setCountCat({
              loading: false,
              categories: data.countByCategory
          })
      })
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Categorías en Base de Datos
          </h5>
        </div>
        <div className="card-body">
          <div className="row">

           {
            countCat.loading
            ?
            <p>Cargando...</p>
            :
            countCat.categories.map((category, index) => (
                <Category {...category} key={category.name + index}/>
            ))
          }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
