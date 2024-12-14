import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/Pages/NavBar";
import "./styles/style.css"
import {DatabaseDataProvider} from "./components/DatabaseDataProvider";
import { useEffect, useState } from "react";


function App() {


  return (
    <DatabaseDataProvider>
      <div className="container-fluid " >
        <section className="row">
          <div className="col">
            <NavBar />
          </div>
        </section>
        <div className="row justify-content-center text-center" >
          <div className=" overflow-x-hidden" style={{ marginTop: "100px", padding:"0px", boxSizing:"border-box" }}>
          {<Outlet />}
           
          </div>
        </div>
      </div>
    </DatabaseDataProvider>
  );
}

export default App;
