import OffcanvasMenu from "../OffCanvasMenu";
import Sidebar from "../SideBar";
import "../../styles/OffCanvas.css"
import { Outlet } from "react-router-dom";
function Administrator() {

    return (
        <>
            <div className="d-flex" id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                        <button className="btn btn-primary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            Toggle Menu
                        </button>
                    </nav>
                    <div className="cont" >
                        <Outlet />
                    </div>
                </div>
                <OffcanvasMenu />
            </div>
        </>
    );
}

export default Administrator;