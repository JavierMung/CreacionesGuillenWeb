// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/MenuAdmin.css"
const Sidebar = () => {
  return (
    
    <div className="  d-none d-lg-block menu-admin" id="sidebar-wrapper">
      <div className="sidebar-heading">Menú</div>
      <div className="list-group list-group-flush" >
        <Link className='list-group-item list-group-item-action' to={"/administrar/precios-cliente"}>Precios</Link>
        <Link className='list-group-item list-group-item-action' to={"/administrar/precios-cliente"}>Clientes</Link>
        <Link className='list-group-item list-group-item-action' to={"/administrar/precios-cliente"}>Trabajadores</Link>
        <Link className='list-group-item list-group-item-action' to={"/administrar/precios-cliente"}>Precios por cliente</Link>
        <Link className='list-group-item list-group-item-action' to={"/administrar/precios-cliente"}>Precios por cliente</Link>
      </div>
    </div>
  );
};

export default Sidebar;
