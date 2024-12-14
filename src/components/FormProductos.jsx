import { useContext } from "react";
import { DatabaseDataContext } from "./DatabaseDataProvider";

function FormProductos() {
    const data = useContext(DatabaseDataContext);

    return (
        <>
            <div>
                <select className="form-select" id="products" aria-label="Productos">
                    {data.productos.map(producto => (
                        <option key={producto.idProducto} value={producto.idProducto}>
                            {producto.nombre}
                        </option>
                    ))}
                </select>
            </div>

        </>);
}

export default FormProductos;