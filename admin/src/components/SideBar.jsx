import React from 'react';
import {Link} from 'react-router-dom';
import "./SideBar.css";

export const SideBar = () => {
  return (
    <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar" >

			<Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
				<div className="sidebar-brand-icon">
					<img className="w-100" src="/images/LOGO-CODEMUSIC.png" alt="Digital House"/>
				</div>
			</Link>

			<hr className="sidebar-divider my-0"/>

			<li className="nav-item active">
				<Link className="nav-link" to="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard - Code Music</span></Link>
			</li>

			<hr className="sidebar-divider"/>

			<div className="sidebar-heading">Actions</div>

			<li className="nav-item">
				<Link className="nav-link collapsed" to="/products">
					<i className="fas fa-fw fa-folder"></i>
					<span>Productos</span>
				</Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link" to="/users">
					<i className="fas fa-users"></i>
					<span>Usuarios</span></Link>
			</li>

			<li className="nav-item">
				<Link className="nav-link" to="/categories">
					<i className="fas fa-fw fa-table"></i>
					<span>Categories</span></Link>
			</li>

			<hr className="sidebar-divider d-none d-md-block"/>
		</ul>
  )
}
