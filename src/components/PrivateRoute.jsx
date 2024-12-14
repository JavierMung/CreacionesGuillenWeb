import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../helpers/DataContext";
import { DatabaseDataContext } from "./DatabaseDataProvider";


// Componente de ruta protegida
function PrivateRoute({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(true) // Lógica para verificar si el usuario está autenticado
    const navigate = useNavigate();
    const location = useLocation();

    // Verificar si el usuario está autenticado al cargar la página
    useEffect(() => {
        //navigate('/login');
        /*const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop);
        }
        const token = localStorage.getItem('token');

        

      if (token) {
           
            fetch('https://localhost:7222/api/User/validateToken', {

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
               
            })
                .then(res => {
                    if (res.ok) return //res.json(); // Devolver la respuesta en caso de éxito
                    else throw new Error("Error")
                })
                .then(res => setIsLoggedIn(true))
                .catch(err => {
                    localStorage.removeItem('token')
                    navigate('/login');
                });


        } else {
            // Si el usuario no está autenticado y está en una ruta protegida, redirige al usuario a la página de inicio de sesión
            if (location.pathname !== '/login') {
                navigate('/login');
            }
        }*/
    }, [location.pathname])

    return (

        <>


            {


                isLoggedIn && children


            }


        </>
    );
}

export default PrivateRoute;
