import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                fetch('https://localhost:7222/api/Helpers/getData', {
                    "headers": {
                        "Authentication": "Bearer " + localStorage.getItem("token")
                    }
                })
                    .then(res => {
                        if (res.ok)
                            return res.json()
                        else throw new Error("Error al intentar obtener la data")

                    })
                    .then(res => {
                        setClients(res.data.clientes)
                        setProducts(res.data.productos)
                    })
                    .catch(err => console.log(err))

            } catch (error) {
                console.error('Error al cargar datos', error);
            }
        };
        fetchData();

    }, [location.pathname]);


    return (
        <DataContext.Provider value={{ clients, products, login, isAuthenticated }}>
            {children}
        </DataContext.Provider>
    );
};
