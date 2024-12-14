import { Link, useNavigate } from "react-router-dom"
import ColumnForm from "../../helpers/ColumnForm"
import logo from '../../assets/logo.png'
import { useState } from "react";
import Modal from "../Modal.jsx"
import { SuccessLoginMessagge } from '../../helpers/Message.jsx'
function Login() {
    
    const [credentials, setCredentials] = useState({ Username: "", Password: "" })
    const navigate = useNavigate()
    const [modalMessage, setModalMessage] = useState("Error al iniciar sesion")
    const [credentialsValid, setCredentialsValid] = useState(true)
    const submitLogin = (event) => {
        navigate('/crear-pedido');
        event.preventDefault()
        fetch("https://localhost:7222/api/User/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else
                    return res.json().then(errorJson => { throw new Error(errorJson.message) });
            })
            .then((res) => {
                localStorage.setItem(`token`, res.data.token);
                setModalMessage(SuccessLoginMessagge)
                navigate('/crear-pedido');
                setCredentialsValid(true)
            })
            .catch((err) => {
                console.error(err.message)
                setCredentialsValid(false)
                setModalMessage(err.message + " ")
            });
    }

    const limpiarCredenciales = () => {
        setCredentials({ Username: "", Password: "" });
    }



    const handleCredentials = (event) => {
        const userInput = event.target.value
        const regex = /^[a-zA-Z0-9\s]*$/

        if (event.target.name === "Username") {
            if (regex.test(userInput))
                setCredentials({ ...credentials, [event.target.name]: event.target.value.trim() })
        } else {
            setCredentials({ ...credentials, [event.target.name]: event.target.value.trim() })
        }

    }

    return (
        <div className="container">
            <Modal Titulo={"Inicio de sesión"}>
                <h5>{modalMessage}</h5>
            </Modal>

            <div className="row justify-content-center align-items-center" style={{ height: "100vh" }}>
                <ColumnForm md={12} margin="" >
                    <div className="row align-items-center" >
                        <ColumnForm>
                            <div className="row mb-3" >
                                <div className="col text-center" >
                                    <h1>
                                        LOGIN
                                    </h1>
                                    <h6>
                                        Creaciones Guillen
                                    </h6>

                                </div>
                                

                            </div>
                        </ColumnForm>
                        <ColumnForm md={5}  >
                            <div className="d-none d-md-block" style={{ position: "relative" }}>
                                <img className="img-fluid" src={logo} alt={"logo"} />
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    height: "100%",
                                    width: "3px", /* Ancho del borde */
                                    background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(138,138,138,1) 60%, rgba(138,138,138,1) 40%, rgba(255,255,255,0) 100%)"
                                }} />
                            </div>
                        </ColumnForm>
                        <ColumnForm md={7} margin="">
                            <div className="row justify-content-center" >
                                <form onSubmit={submitLogin}>
                                    <ColumnForm md={7} margin="">
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                                            <input onChange={handleCredentials} value={credentials.Username} name="Username" type="text" className={credentialsValid?"form-control ":"form-control is-invalid"} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                            <input onChange={handleCredentials} value={credentials.Password} name="Password" type="password" className={credentialsValid?"form-control ":"form-control is-invalid"} id="exampleInputPassword1" />
                                        </div>
                                        <div className=" mt-3 text-end">
                                            <button className="btn btn-outline-success" type="submit">
                                                Iniciar sesión
                                            </button>
                                        </div>
                                        <div className="mt-3">
                                            <Link style={{ fontSize: "14px" }}>¿Olvidaste tu contraseña?</Link>
                                        </div>
                                    </ColumnForm>
                                </form>
                            </div>
                        </ColumnForm>
                    </div>
                </ColumnForm>
            </div>
        </div>
    );
}

export default Login;