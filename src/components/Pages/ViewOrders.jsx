import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMultiSelect from '../../hooks/useMultiSelect';
import ColumnForm from "../../helpers/ColumnForm";
import "../../styles/Box.css"
import Filtro from "../../helpers/Filtro";
import Pagination from "../Pagination";
import { MdFilterListAlt, MdOutlineBuildCircle } from "react-icons/md";
import { formatterDate, formatterDolar } from "../../helpers/Functions";


function ViewOrders() {

    const navigate = useNavigate()

    const [itemMenuSelected, setItemMenuSelected] = useState(2)

    const [pedidos, setPedidos] = useState(null)


    const [pageSize, setPageSize] = useState(10);

    const [filtros, setFiltros] = useState({
        "idPedido": null,
        "fechaInicio": null,
        "fechaFin": null,
        "status": [],
        "idClientes": [],
        "idEncargados": [],
        "page": 1,
        "pageSize": 10
    })

    const handlePageChange = (newPage) => {
        setFiltros(prevState => ({
            ...prevState,
            "page": newPage
        }));
    };




    // Para el primer filtro
    const { selectedOptions: selectedOptions1, handleChangeMulti: handleChangeMulti1, updateFiltros: updateFiltros1 } = useMultiSelect(setFiltros);

    // Para el segundo filtro
    const { selectedOptions: selectedOptions2, handleChangeMulti: handleChangeMulti2, updateFiltros: updateFiltros2 } = useMultiSelect(setFiltros);


    const redirectToPedido = (idPedido) => {
        navigate(`./pedido/${idPedido}`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "idClientes" || name === "idEncargados") {
            // Si el campo es un arreglo, convertir el valor en un arreglo y actualizar el estado
            setFiltros(prevState => ({
                ...prevState,
                [name]: [value]
            }));
        } else if (name === "fechaInicio" || name === "fechaFin" || name === "idPedido") {
            // Si el campo es fecha, verificar si el valor es una cadena vacía y actualizar el estado con null
            setFiltros(prevState => ({
                ...prevState,
                [name]: value !== "" ? value : [] // Establecer null si el valor es una cadena vacía
            }));
        } else if (name === "status") {
            // Si el campo es status, verificar si todos los elementos del array están seleccionados y actualizar el estado con null
            setFiltros(prevState => ({
                ...prevState,
                [name]: value === "TODOS" ? [] : [value] // Establecer null si se selecciona "TODOS"
            }));
        }
        else {
            // Si el campo no es un arreglo, actualizar el estado normalmente
            setFiltros(prevState => ({
                ...prevState,
                [name]: value
            }));
        }


    };

    const optionsClientes = [
        { value: 1, label: 'Los infante' },
        { value: 2, label: 'Sr. Irma' },
        { value: 3, label: 'Unigen' },
        { value: 4, label: 'Armando' },
        { value: 5, label: 'Ana Laura' },
        { value: 6, label: 'Angelica Luna' },
        { value: 7, label: 'Margil' },
        { value: 8, label: 'Sr. Alejandro' },
    ];

    const optionsEncargados = [
        { value: 1, label: 'Karina' },
        { value: 2, label: 'Sara' },
        { value: 3, label: 'Cheve' },
        { value: 4, label: 'Paula' },
        { value: 5, label: 'Erika' },
        { value: 6, label: 'Mayra' },
        { value: 7, label: 'David' },
    ];



    useEffect(() => {
        fetch("https://localhost:7222/api/Pedidos/getPedidos",
            {
                method: "POST",
                body: JSON.stringify(filtros),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer "+localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(res => { setPedidos(res.data.pedidos); setPageSize(res.data.numeroPaginas) })
            .catch(error => error)

    }, [filtros])

    const handleCollapseToggle = (value) => {
        if (itemMenuSelected === value) {
            // Si el collapse seleccionado ya está abierto, lo cerramos
            setItemMenuSelected(null);
        } else {
            // Si el collapse seleccionado está cerrado, lo abrimos y cerramos el resto
            setItemMenuSelected(value);
        }
    };


    return (
        <>
            <ColumnForm text="center" titulo={"Pedidos"} >

                <div className="row justify-content-center align-items-center">
                    <ColumnForm text="center" md={8}>
                        <ul className="nav nav-tabs">
                            <li className="nav-item" >
                                <a onClick={() => handleCollapseToggle(1)}
                                    href="http://google.com"
                                    className={itemMenuSelected === 1 ? "nav-link active" : "nav-link"}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample1"
                                    aria-expanded={itemMenuSelected === 1 ? "true" : "false"}
                                    aria-controls="collapseExample1">
                                    <MdFilterListAlt /> Filtros
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => handleCollapseToggle(2)}
                                    href="http://google.com"
                                    className={itemMenuSelected === 2 ? "nav-link active" : "nav-link"}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample2"
                                    aria-expanded={itemMenuSelected === 2 ? "true" : "false"}
                                    aria-controls="collapseExample2">
                                    <MdOutlineBuildCircle /> Funciones
                                </a>
                            </li>

                        </ul>
                    </ColumnForm>
                </div>
            </ColumnForm>

            <div className={"collapse" + (itemMenuSelected === 1 ? " show" : "")} id="collapseExample1">

                <div className="row justify-content-center ">
                    <ColumnForm lg={8} md={10} >
                        <div className="row align-items-center">
                            <Filtro
                                nombre={"N° pedido"}
                                handleChange={handleChange}
                                identificador={"idPedido"}
                                value={filtros.idPedido}

                            />
                            <Filtro
                                nombre={"Fecha inicio"}
                                handleChange={handleChange}
                                identificador={"fechaInicio"}
                                value={filtros.fechaInicio}
                                type="date"

                            />
                            <Filtro
                                nombre={"Fecha fin"}
                                handleChange={handleChange}
                                identificador={"fechaFin"}
                                value={filtros.fechaFin}
                                type="date"

                            />
                            <Filtro
                                size={4}
                                nombre={"Clientes"}
                                handleChange={handleChange}
                                identificador={"idClientes"}
                                value={filtros.idClientes}
                                type="selectMultiple"
                                options={optionsClientes}
                                selectedOptions={selectedOptions1}
                                handleChangeMulti={(selected) => updateFiltros1('idClientes', handleChangeMulti1(selected))} // Pasar la función de cambio del hook y actualizar filtros
                            />
                            <Filtro
                                size={4}
                                nombre={"Encargados"}
                                handleChange={handleChange}
                                identificador={"idEncargados"}
                                value={filtros.idEncargados}
                                type="selectMultiple"
                                options={optionsEncargados}
                                selectedOptions={selectedOptions2}
                                handleChangeMulti={(selected) => updateFiltros2('idEncargados', handleChangeMulti2(selected))} // Pasar la función de cambio del hook y actualizar filtros
                            />
                            <Filtro
                                nombre={"Status"}
                                handleChange={handleChange}
                                identificador={"status"}
                                value={filtros.status[0] || ""}
                                type="select"
                                selectedOptions={<>
                                    <option value="TODOS">TODOS</option>
                                    <option value="PAGADO">PAGADO</option>
                                    <option value="COMPLETADO">COMPLETADO</option></>}
                            />

                        </div>

                    </ColumnForm>
                </div>
            </div>
            <div className={"collapse" + (itemMenuSelected === 2 ? " show" : "")} id="collapseExample2">
                ejemplo2
            </div>
            <div className="row justify-content-center" >
                <ColumnForm lg={8} md={10} >
                    <div style={{ overflowX: "auto", maxHeight: "800px", height: "550px" }}>
                        <table className="table align-middle table-hover table-striped text-start"  >
                            <thead>

                                <tr className="bg-dark text-light align-middle">
                                    <th style={{ width: "5%" }} scope="col">#</th>
                                    <th style={{ width: "25%" }} scope="col">Cliente</th>
                                    <th style={{ width: "25%" }} scope="col">Fecha</th>
                                    <th style={{ width: "20%" }} scope="col">Total</th>
                                    <th style={{ width: "25%" }} scope="col">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pedidos ?
                                        pedidos.map((pedido) => {
                                            return (<>
                                                <tr className="justify-content-center" style={{ cursor: "pointer" }} onClick={() => redirectToPedido(pedido.idPedido)}>
                                                    <th scope="row ">{pedido.idPedido}</th>
                                                    <td>{pedido.clienteNombre}</td>
                                                    <td>{formatterDate(pedido.fecha)}</td>
                                                    <td>{formatterDolar.format(pedido.total)}</td>
                                                    <td className="">{pedido.status}</td>
                                                </tr>
                                            </>)

                                        })
                                        :
                                        (
                                            <>
                                                <tr className="justify-content-center">
                                                    <td colSpan="6">

                                                        <div className="d-flex justify-content-center">
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                }

                            </tbody>
                        </table>
                    </div>
                </ColumnForm>

                <ColumnForm lg={8} md={10}>
                    {
                        pedidos && <Pagination currentPage={filtros.page} totalPages={pageSize} onPageChange={handlePageChange} />
                    }


                </ColumnForm>


            </div>
        </>
    );
}

export default ViewOrders;