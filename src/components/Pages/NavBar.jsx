import { Link } from "react-router-dom";
import { CONSTANTS } from "../../helpers/Data.js";
import { MdAssignmentAdd, MdAssignment, MdInventory, MdOutlinePeople, MdExitToApp } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";


function NavBar() {


    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>{CONSTANTS[0].NOMBRE_EMPREASA}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/crear-pedido'}>
                                <MdAssignmentAdd /> Crear pedido
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/pedidos'}>
                                <MdAssignment /> Pedidos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/notas'}>
                                <FaNotesMedical /> Notas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/ordenes'}>
                                <MdOutlinePeople />  Ordenes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/inventario'}>
                                <MdInventory /> Inventario
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link'} to={'/administrar'}>
                                <MdInventory /> Administrar
                            </Link>
                        </li>
                    
                    </ul>
                    <div className="d-flex me-5">
                        <Link className={'nav-link'} to={'/login'} onClick={() => localStorage.removeItem('token')}>
                            <MdExitToApp /> Cerrar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default NavBar;