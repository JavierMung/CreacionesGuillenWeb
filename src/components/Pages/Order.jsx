import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnForm from "../../helpers/ColumnForm";
import { formatterDolar } from "../../helpers/Functions";
import SummaryOrder from "../SummaryOrder";
import { PDFDownloadLink } from '@react-pdf/renderer'; // Importa PDFDownloadLink desde react-pdf/renderer
import OrderPdf from "../../PDF/OrderPdf";
import { MdCloudDownload, MdMarkunread } from "react-icons/md";

function Order() {

  const { pedidoId } = useParams();
  const [pedido, setPedido] = useState(null)
  const [listaProductos, setListaProductos] = useState([])
  const opciones = { day: '2-digit', month: 'long', year: 'numeric' };
  useEffect(() => {
    fetch(`https://localhost:7222/api/Pedidos/getPedido/${pedidoId}`,
    {
      method:"GET",
      headers:{
        "Authorization": "Bearer "+localStorage.getItem('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        setPedido(data.data)
        setListaProductos(data.data.productos); // Establecer la lista de productos en el estado

      })
      .then(() => console.log(pedido))
      .catch(error => console.error('Error fetching pedido:', error));
  }, [pedidoId])


  useEffect(() => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop);
    }
  }, []);

  const handleGeneratePDF = () => {
    // Aquí puedes realizar cualquier lógica adicional antes de generar el PDF si es necesario
    // Por ejemplo, podrías pasar datos adicionales a MyDocument

    // Llama a MyDocument y pásale los datos necesarios para la generación del PDF
    // En este caso, pasamos pedido y listaProductos como propiedades
    // Puedes ajustar esto según las necesidades de tu aplicación
    const pdf = <OrderPdf pedido={pedido} listaProductos={listaProductos} />;

    // Retorna el componente PDFDownloadLink, que generará y mostrará el PDF cuando se haga clic en él
    return <PDFDownloadLink document={pdf} fileName="resumen_pedido.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Cargando...' : <MdCloudDownload />)}
    </PDFDownloadLink>;
  };


  // Ahora puedes utilizar pedidoId en tu componente como necesites
  return (
    <div className="row justify-content-center text-center p-sm-3">
      {/* Aquí puedes mostrar la información del pedido */}
      {pedido ? (
        <>
          <ColumnForm titulo={`Resumen del pedido - ${pedido.clienteNombre}`} lg={6} md={9} >
            <div>
              <p>{new Date(pedido.fecha).toLocaleDateString('es-ES', opciones) + " - " + pedido.status}</p>
              <SummaryOrder
                listaProductos={listaProductos}
                formatterDolar={formatterDolar}
                total={pedido.total}
              />
            </div>
            {handleGeneratePDF()}

            <div style={{ width: '100%', height: '100vh' }}>

            </div>
          </ColumnForm>

          <ColumnForm lg={12} md={9} />
          <ColumnForm lg={2} md={9} >
            <MdMarkunread />

          </ColumnForm>
          <ColumnForm lg={2} md={9} >


          </ColumnForm>
        </>

      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
export default Order;