import React, { useState, useEffect, createContext } from 'react';

const DatabaseDataContext = createContext(null);

function DatabaseDataProvider({ children }) {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://localhost:7222/api/Helpers/getData',
            {
              headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
              }
            }
          );
          const responseData = await response.json();
          setData(responseData.data);
         
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      fetchData();
    }, [location.pathname]);
  
    return (
      <DatabaseDataContext.Provider value={data}>
        {children}
      </DatabaseDataContext.Provider>
    );
  }
export  {DatabaseDataContext, DatabaseDataProvider};