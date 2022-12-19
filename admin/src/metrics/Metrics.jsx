import React, { useState } from "react";
import { useEffect } from "react";
import { UseFetch } from "../hooks/UseFetch";
import { Metric } from "./Metric";

export const Metrics = () => {
    /* console.log(process.env.REACT_APP_API_URL_BASE); */
	const [state, setState] = useState({
		products: {
			title: "Total productos",
			icon: "fa-boxes",
			value: 0,
			color: "primary"
		},
		users: {
			title: "Usuarios registrados",
			icon: "fa-users",
			value: 0,
			color: "success"
		},
		categories: {
			title: "Categorías",
			icon: "fa-folder",
			value: 0,
			color: "warning"
		}
	})

	useEffect(() => {

		UseFetch('/products')
		.then(({meta}) => {
			setState({
				products : {
					...state.products,
					value : meta.countByCategory.totalProducts
				},
				users : {
					...state.users,
					value : meta.countByCategory.totalUsers
				},
				categories : {
					...state.categories,
					value : meta.countByCategory.totalCategories
				}
			})
		}).catch(() => console.error)
	}, [])


  return (
    <div className="row">
      <Metric {...state.products}/>
      <Metric {...state.users}/>
      <Metric {...state.categories}/>
    </div>
  );
};
