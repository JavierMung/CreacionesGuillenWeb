import { useState, useEffect, useContext } from "react";
import { formatterDolar } from "../../helpers/Functions";
import { v4 as uuidv4 } from 'uuid';
import useActive from "../../hooks/useActive";
import { NumericFormat } from 'react-number-format';
import SummaryOrder from "../SummaryOrder";
import ColumnForm from "../../helpers/ColumnForm";
import { DatabaseDataContext } from "../DatabaseDataProvider";
import Modal from "../Modal";
import { ErrorMakeOrderMessagge, InfoLoadingModal, SuccessMakeOrderMessagge, WarnEmptyOrderMessagge, WarnEmptyProdcutMessagge } from "../../helpers/Message";
import { Navigate } from "react-router-dom";
import Titulo from "../../helpers/Titulo";
import Table from "../Table";
import DeleteRowButton from "../DeleteRowButton";
import Input from "../Input";

function CreateOrder() {

    const data = useContext(DatabaseDataContext);
    const { active, handleActive } = useActive()
    const [selectedProductSizes, setSelectedProductSizes] = useState([]);
    const [messageModal, setMessageModal] = useState(WarnEmptyOrderMessagge)
    const [pedido, setPedido] = useState({ cliente: null, idCliente: 0, productos: [], fechaDeEntrega: null, token: null })
    const [producto, setProducto] = useState({ nombreEncargado: "", idEncargado: 0, nombreProducto: "", idProducto: 0, cantidad: null, precio: 0, descripcion: "", numeroProducto: uuidv4() })
    const [emptyProduct, setEmptyProduct] = useState(true)
    const total = pedido.productos && pedido.productos.length > 0 ? pedido.productos.reduce((accumulator, producto) => {
        return accumulator + (producto.precio * producto.cantidad)
    }, 0) : 0;
    const agregarProducto = () => {
        if (emptyProduct) {
            setMessageModal(WarnEmptyProdcutMessagge)

        }
        else {

            const nuevoPedido = {
                ...pedido,
                productos: [...pedido.productos, producto]
            };

            setPedido(nuevoPedido);

            setProducto({
                ...producto,
                nombreProducto: "",
                idProducto: 0,
                cantidad: 0,
                precio: 0,
                descripcion: "",
                numeroProducto: uuidv4()
            });
            /*
            setListaProdcutos([...listaProductos, producto]);
            setProducto({
                ...producto,
                nombreProducto: "",
                idProducto: 0,
                cantidad: 0,
                precio: 0,
                descripcion: "",
                numeroProducto: uuidv4()
            })*/
            return
        }
    }
    const eliminarProducto = (numeroProductoEliminar) => {
        setPedido((prevPedido) => {
            return {
                ...prevPedido,
                productos: prevPedido.productos.filter(prod => {
                    return prod.numeroProducto !== numeroProductoEliminar;
                })
            };
        });
    };

    const handleProducto = (event, tipo) => {

        if (event.target.name === "encargado") {
            const selectedEncargadoId = event.target.value; // ID del encargado seleccionado
            const selectedEncargadoNombre = event.target.options[event.target.selectedIndex].text; // Nombre del encargado seleccionado

            setProducto({
                ...producto,
                idEncargado: selectedEncargadoId,
                nombreEncargado: selectedEncargadoNombre
            });
        } else if (event.target.name === "cliente") {
            const selectedProductoId = event.target.value; // ID del producto seleccionado
            const selectedProductoNombre = event.target.options[event.target.selectedIndex].text; // Nombre del producto seleccionado

            setProducto({
                ...producto,
                idCliente: selectedProductoId,
                nombreCliente: selectedProductoNombre
            });
        }
        else if (event.target.name === "producto") {
            const selectedProductoId = event.target.value; // ID del producto seleccionado
            const selectedProductoNombre = event.target.options[event.target.selectedIndex].text; // Nombre del producto seleccionado

            setProducto({
                ...producto,
                idProducto: selectedProductoId,
                nombreProducto: selectedProductoNombre
            });
        }
        else {

            setProducto({
                ...producto,
                [event.target.name]:
                    event.target.name === 'precio' || event.target.name === 'cantidad' ?
                        event.target.value.replace(/[^0-9.]/g, '') : event.target.value

            })
        }
        const productId = event.target.value;
        const selectedProduct = data.productos.find(producto => producto.idProducto.toString() === productId);
        if (selectedProduct) {
            setSelectedProductSizes(selectedProduct.size);
        } else {
            setSelectedProductSizes([]);
        }


    }
    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    }
    const handlePedido = (event) => {
        if (event.target.name === "cliente")
            setPedido({ ...pedido, [event.target.name]: event.target.options[event.target.selectedIndex].text, idCliente: event.target.value })
        else
            setPedido({ ...pedido, [event.target.name]: event.target.value })
    }

    const validarPedido = () => {
        console.log(pedido);
        const enviarPedidoAlServidor = async () => {
            setMessageModal(InfoLoadingModal)
            try {
                fetch('https://localhost:7222/api/Pedidos/addPedidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + localStorage.getItem('token')

                    },
                    body: JSON.stringify(pedido),
                })
                    .then(res => {
                        if (res.status == 401 || res.status === 403) {
                            console.log("error 400");
                            localStorage.removeItem('token')
                            limpiar()
                            //Navigate('/login')
                        }
                        else if (!res.ok) {
                            console.log("exito NO");

                            throw new Error('Hubo un problema con la solicitud.');
                        }
                        return res.json();
                    })
                    .then(data => {
                        console.log("exito");
                        setMessageModal(SuccessMakeOrderMessagge)
                        limpiar()
                    })
                    .catch(error => {
                        console.log("peticion");
                        setMessageModal(ErrorMakeOrderMessagge)
                    })


            } catch (error) {
                setMessageModal(ErrorMakeOrderMessagge)
                console.error('Error en la petición Fetch:', error);
            }
        };

        if (pedido.productos.length > 0) {
            enviarPedidoAlServidor();
        } else {
            setMessageModal(WarnEmptyOrderMessagge)
        }
    }
    useEffect(() => {
        fetch(`https://localhost:7222/api/Helpers/getPrice?cliente=${pedido.idCliente}&producto=${producto.idProducto}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')

            },
        })
            .then(res => res.json())
            .then(data => setProducto(prevProducto => ({ ...prevProducto, precio: data })))


            .catch(err => err)
    }, [producto.idProducto, pedido.idCliente])

    useEffect(() => {
        if (producto.nombreCliente === ""
            || producto.nombreEncargado === ""
            || producto.nombreProducto === ""
            || producto.cantidad <= 0
            || producto.precio <= 0
            || producto.descripcion === "") {
            setEmptyProduct(true)
        } else {
            setEmptyProduct(false)
        }
    }, [producto])




    const limpiar = () => {
        setPedido({ cliente: null, idCliente: 0, productos: [], fechaDeEntrega: null, token: null });
        setProducto({
            ...producto,
            nombreProducto: "",
            idProducto: 0,
            cantidad: 0,
            precio: 0,
            descripcion: "",
            numeroProducto: uuidv4()
        })

    }

    const [data3, setData] = useState([
        ["prueba1", "prueba2"],
        ["Prueba3", "prueba4"],
        ["Prueba5", "prueba6"]
    ]);

    const deleteRow = (index) => {
        const updatedData = data3.filter((_, i) => i !== index);
        setData(updatedData);
    };


    return (
        <>
            <Titulo Titulo={"Crear Pedido"} />
            <div className="row justify-content-center text-center p-sm-3 ">
                <Modal Titulo={"Solicitud de pedido"}  >
                    {messageModal}
                </Modal>
                <ColumnForm titulo={"Cliente"} lg={4} md={6} >
                    <select disabled={pedido.productos ? (pedido.productos.length > 0) : false} onChange={handlePedido} name={"cliente"} value={pedido.idCliente} className="form-select" aria-label="Default select example">
                        <option key={-1} >Seleccionar cliente...</option>
                        {data && data.clientes.map((cliente, index) => {
                            return (<>
                                <option key={cliente.idCliente} value={cliente.idCliente}>{cliente.name}</option>
                            </>)
                        })}
                    </select>
                </ColumnForm>

                <ColumnForm titulo={"Fecha"} lg={2} md={3}>
                    <input onChange={handlePedido} min={obtenerFechaActual()} name="fechaDeEntrega" type="date" aria-label="Last name" className="form-control" placeholder="ejem. azul marino" />
                </ColumnForm>

                <div className="col-12" />

                <ColumnForm lg={6} md={9} titulo={"Encargado"}>
                    <label className="form-check-label me-3" htmlFor="flexCheckDefaultactive">
                        Mantener encargado
                    </label>
                    <input disabled={pedido.productos ? (pedido.productos.length > 0) : false} className="form-check-input" type="checkbox" onChange={handleActive} value={active} id="" />
                    <select disabled={!active ? (pedido.productos.length > 0) : false} onChange={handleProducto} name="encargado" defaultValue={producto.nombreEncargado} className="form-select" aria-label="Default select example" >
                        <option key={-1}>Seleccionar encargado</option>
                        {data && data.encargados.map((active, index) => {
                            return (<>
                                <option key={active.idEncargado} value={active.idEncargado}>{active.nombre}</option>
                            </>)
                        })}
                    </select>
                </ColumnForm>
                <div className="col-12" />

                <ColumnForm titulo={"Producto"} lg={6} md={9}>
                    <div className="row">

                        <ColumnForm lg={7}>
                            <select onChange={handleProducto} name="producto" value={producto.idProducto} className="form-select" aria-label="Default select example" >
                                <option key={-1}>Seleccionar producto</option>
                                {data && data.productos.map((producto, index) => {
                                    return (
                                        <>
                                            <option key={producto.idProducto} value={producto.idProducto} >
                                                {producto.nombre}
                                            </option>

                                        </>
                                    )
                                })
                                }
                            </select>
                        </ColumnForm>
                        <ColumnForm lg={5}>
                            {producto.idProducto && (
                                <select name="size" className="form-select" aria-label="Default select example">
                                    <option key={-1} value=''>Seleccionar tamaño</option>
                                    {selectedProductSizes.map((size, index) => (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </ColumnForm>
                    </div>
                    <div className="row" >
                        <ColumnForm md={3}>
                            <label className="form-label">Cantidad</label>
                            <NumericFormat
                                onChange={handleProducto}
                                name="cantidad"
                                value={producto.cantidad}
                                displayType={'input'}
                                thousandSeparator={true}
                                aria-label="Cantidad"
                                className="form-control"
                                min={1}
                                suffix=" pzs"
                            />
                        </ColumnForm>
                        <ColumnForm md={4} >
                            <label className="form-label">Precio</label>
                            <NumericFormat
                                onChange={handleProducto}
                                name="precio"
                                value={producto.precio}
                                displayType={'input'}
                                thousandSeparator={true}
                                prefix={'$'}
                                aria-label="Precio"
                                className="form-control"
                            />
                        </ColumnForm>
                        <ColumnForm md={5}>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="font-bold ">Precio</h1>
                                <Input
                                    type="text"
                                    placeholder="Escribe algo..."
                                    value=""
                                    required={true}
                                    pattern=".*"
                                />
                            </div>
                            <label className="form-label">Descripción</label>
                            <input onChange={handleProducto} name="descripcion" value={producto.descripcion} type="text" aria-label="Last name" className="form-control" placeholder="ejem. azul marino" />
                        </ColumnForm>
                        <ColumnForm text="center" md={12}>
                            <div className="row p-2" >
                                <button onClick={agregarProducto} type="button" className="btn btn-primary " data-bs-toggle={emptyProduct ? "modal" : ""} data-bs-target={emptyProduct ? "#exampleModal" : ""}>Agregar producto</button>
                            </div>
                        </ColumnForm>

                    </div>
                </ColumnForm>
                <div className="col-sm-12" />
                <ColumnForm titulo={"Resumen del pedido"} lg={6} md={9} >

                    <SummaryOrder

                        listaProductos={pedido.productos}
                        formatterDolar={formatterDolar}
                        eliminarProducto={eliminarProducto}
                        total={total}
                    />

                    <div className="text-end">
                        <button type="button" className="btn btn-danger ">Limpiar</button>
                        <button onClick={validarPedido} type="button" className="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Realizar pedido</button>
                    </div>
                </ColumnForm>
                <ColumnForm>
                    <Table columns={["Columna1", "Columna2", "Editable"]} data={data3.map((row, index) => [...row, <DeleteRowButton deleteRow={() => deleteRow(index)} />])}
                        isEditable={true}>

                    </Table>
                </ColumnForm>
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-gray-800">¡Hola, Tailwind con Vite!</h1>
                        <p className="mt-2 text-gray-600">Este es un ejemplo básico.</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Click aquí
                        </button>
                    </div>
                </div>
            </div>
        </>);
}

export default CreateOrder;