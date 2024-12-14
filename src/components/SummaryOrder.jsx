function SummaryOrder({ listaProductos = [], formatterDolar, eliminarProducto = null, total = 0 }) {
    return (
        <table className="table table-sm table-responsive" >
            <thead>
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio c/u</th>
                    <th scope="col">Encargado</th>
                    <th scope="col">Sub-Total</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    listaProductos && listaProductos.map((pro, index) => {
                        return (
                            <tr key={index} className="align-middle">
                                <th scope="row">{pro.nombreProducto || pro.nombre}<p>{pro.descripcion}</p></th>
                                <td>{pro.cantidad}</td>
                                <td>{formatterDolar.format(pro.precio)}{" MXN"}</td>
                                <td>{pro.nombreEncargado}</td>
                                <td>{formatterDolar.format(pro.cantidad * pro.precio)}{" MXN"}</td>
                                <td>
                                    {
                                        eliminarProducto && <button className="btn " onClick={() => eliminarProducto(pro.numeroProducto)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 512 512"><path fill="#c82828" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z" /></svg>
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                <tr>

                    <td colSpan="3" className="table-active"></td>
                    <td ><h6>Total</h6></td>
                    <td>{formatterDolar.format(total)}{" MXN"}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default SummaryOrder;