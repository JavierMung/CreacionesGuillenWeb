import { MdErrorOutline } from "react-icons/md";
import { MdError } from "react-icons/md";


const ErrorMakeOrderMessagge =
    <>
        <div className="justify-content-center alert alert-danger" role="alert">
            <MdError /> El pedido <a href="#" className="alert-link">NO</a> se cargo. Intentelo de nuevo más tarde.
        </div>
    </>
const WarnEmptyProdcutMessagge =
    <>
        <div className="justify-content-center alert alert-warning" role="alert">
            <MdErrorOutline /> Por favor llena todos los campos
        </div>
    </>
const WarnEmptyOrderMessagge =
    <>
        <div className="justify-content-center alert alert-warning" role="alert">
            <MdErrorOutline /> Por favor carga al menos un producto
        </div>
    </>
const SuccessMakeOrderMessagge =
    <>
        <div className="justify-content-center alert alert-success" role="alert">
            El pedido se cargo con <a href="#" className="alert-link"> éxito</a>
        </div>
    </>
const SuccessLoginMessagge =
    <>
        <div className="justify-content-center alert alert-success" role="alert">
            Inicio de sesión con <a href="#" className="alert-link"> éxito</a>
        </div>
    </>
const InfoLoadingModal =
    <>
        <div className="justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Procesando pedido...</span>
            </div>
        </div>
        <div className="justify-content-center">
            <strong>Procesando pedido...</strong>
        </div>
    </>
const ErrorInvalidCredentials =
    <>
        <div className="justify-content-center">
            <strong>Credenciales inválidas.</strong>
        </div>
    </>
const ErrorCredentialsExpiration =
    <>
        <div className="justify-content-center">
            <strong>Tu sesión a terminado. Por favor vuelve a iniciar sesión.</strong>
        </div>
    </>


export {SuccessLoginMessagge, ErrorMakeOrderMessagge, WarnEmptyProdcutMessagge, WarnEmptyOrderMessagge, SuccessMakeOrderMessagge, InfoLoadingModal }