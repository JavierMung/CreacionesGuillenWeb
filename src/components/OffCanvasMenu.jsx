// src/components/OffcanvasMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const OffcanvasMenu = () => {
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menú</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="list-group list-group-flush">
          <Link to={"/administrar/precios-cliente"}>Precios por cliente</Link>
          <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
          <a href="#" className="list-group-item list-group-item-action bg-light">Profile</a>
          <a href="#" className="list-group-item list-group-item-action bg-light">Settings</a>
          <a href="#" className="list-group-item list-group-item-action bg-light">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasMenu;
