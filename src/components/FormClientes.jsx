import React, { useContext, useState } from "react";
import { DatabaseDataContext } from "./DatabaseDataProvider";

function FormClientes({ onClienteSeleccionado }) {
    const data = useContext(DatabaseDataContext);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');

    const handleClienteChange = (event) => {
        const clienteId = event.target.value;
        setClienteSeleccionado(clienteId);
        const clienteSeleccionadoNombre =  event.target.selectedOptions[0].text;
        onClienteSeleccionado({ id: clienteId, nombre: clienteSeleccionadoNombre });
    };

    return (
        <>
            <div>
                <select className="form-select" id="clientes" aria-label="Clientes" onChange={handleClienteChange} value={clienteSeleccionado}>
                    <option value="">Seleccionar cliente</option>
                    {data.clientes.map(cliente => (
                        <option key={cliente.idCliente} value={cliente.idCliente}>
                            {cliente.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default FormClientes;
