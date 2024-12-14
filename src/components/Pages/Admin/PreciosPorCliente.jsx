import { useContext, useEffect, useState } from "react";
import ColumnForm from "../../../helpers/ColumnForm";
import FormClientes from "../../FormClientes";
import FormProductos from "../../FormProductos";
import { DatabaseDataContext } from "../../DatabaseDataProvider";

function PreciosPorCliente() {
    const data = useContext(DatabaseDataContext);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    const handleClienteSeleccionado = (cliente) => {
        setClienteSeleccionado(cliente);
    };

    useEffect(() => {
        console.log(clienteSeleccionado);
    }, [clienteSeleccionado])

    return (
        <div >
            <ColumnForm titulo={"Precios"} text="center">
                <div className="row justify-content-center">

                    <ColumnForm text="center">
                        <div className="row justify-content-start"  >
                            <ColumnForm md={6} lg={4}>
                                <ColumnForm md={6} text="center">
                                    <FormClientes onClienteSeleccionado={handleClienteSeleccionado} />
                                </ColumnForm>
                                <table class="table-sm" >
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            data.productos.map(producto => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{producto.nombre}</th>
                                                        <td><input value={producto.precio} /></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </ColumnForm>
                            <ColumnForm md={4}>
                                <ColumnForm md={9} />
                                <table class="table-sm" >
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            data.productos.map(producto => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{producto.nombre}</th>
                                                        <td><input value={producto.precio} /></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </ColumnForm>
                            <ColumnForm md={4}>
                                <ColumnForm md={6} text="center">
                                    <FormClientes onClienteSeleccionado={handleClienteSeleccionado} />
                                </ColumnForm>
                                <table class="table-sm" >
                                    <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            data.productos.map(producto => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{producto.nombre}</th>
                                                        <td><input value={producto.precio} /></td>
                                                    </tr>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </ColumnForm>
                        </div>
                    </ColumnForm>
                </div>
            </ColumnForm>
        </div>);
}

export default PreciosPorCliente;