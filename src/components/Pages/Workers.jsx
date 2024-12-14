import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ColumnForm from "../../helpers/ColumnForm";
import Modal from "../Modal";
import "../../styles/Ordenes.css"

function Workers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7222/api/Helpers/getOrders",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => setData(data.data))
    }, [])


    return (
        <>
            <div className="row justify-content-center">

                <ColumnForm text={"center"}
                    titulo={"Ordenes"}
                    md={8}
                >
                    <div className="row">
                        {data.map(cliente => {
                            // Agrupar detalles por ID de pedido
                            const detallesAgrupados = {};
                            cliente.detalleByCliente.forEach(detalle => {
                                if (!detallesAgrupados[detalle.idPedido]) {
                                    detallesAgrupados[detalle.idPedido] = [];
                                }
                                detallesAgrupados[detalle.idPedido].push(detalle);
                            });

                            return (
                                <ColumnForm md={4} key={cliente.idEncargado}>
                                    <div className="p-1 rounded border border-secondary">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{cliente.nombre}</div>
                                            <button className="btn link-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${cliente.idEncargado}`}>
                                                Ordenes pendientes
                                            </button>
                                            <span className="badge bg-danger rounded-pill m-2">{Object.keys(detallesAgrupados).length}</span>
                                        </div>
                                    </div>
                                    <Modal Titulo={`Ordenes para ${cliente.nombre}`} id={cliente.idEncargado + ""} IsStatic = {true}>
                                        <>

                                            {Object.keys(detallesAgrupados).map(idPedido => (
                                                <div key={idPedido}>
                                                    <Link to={`/pedidos/pedido/${idPedido}`} key={idPedido} >
                                                        <h6>Pedido: {idPedido}</h6>
                                                    </Link>
                                                    <ul>
                                                        {/* Iterar sobre las órdenes de este pedido */}
                                                        {detallesAgrupados[idPedido].map(pedido => (
                                                            <li key={pedido.idDetalle}>
                                                                Producto: {pedido.nombreProducto}, Cantidad: {pedido.cantidad}, Color: {pedido.color}, Status: {pedido.statusPedido}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </>
                                    </Modal>
                                </ColumnForm>
                            );
                        })}


                    </div>


                </ColumnForm>
            </div>
        </>
    );
}

export default Workers;

