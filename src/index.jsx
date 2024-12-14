import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import CreateOrder from './components/Pages/CreateOrder';
import Inventario from './components/Pages/Inventario';
import ViewOrders from './components/Pages/ViewOrders';
import FastoOrder from './components/Pages/FastOrder';
import Order from './components/Pages/Order';
import Workers from './components/Pages/Workers';
import Login from './components/Pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Administrator from './components/Pages/Administrator';
import PreciosPorCliente from './components/Pages/Admin/PreciosPorCliente';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <PrivateRoute>
      <Navigate to="/crear-pedido" />
    </PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: (<><h1>No existe la pagina</h1></>),
    children: [
      {
        path: "/crear-pedido",
        element:
          <PrivateRoute>
            <CreateOrder />
          </PrivateRoute>
      },
      {
        path: "/inventario",
        element:
          <PrivateRoute>
            <Inventario />
          </PrivateRoute>
      },
      {
        path: "/pedidos/pedido/:pedidoId",
        element:
          <PrivateRoute>
            <Order />
          </PrivateRoute>
      },
      {
        path: "/pedidos",
        element:
          <PrivateRoute>
            <ViewOrders />,
          </PrivateRoute>
      },
      {
        path: "/notas",
        element:
          <PrivateRoute>
            <FastoOrder />
          </PrivateRoute>
      },
      {
        path: "/ordenes",
        element:
          <PrivateRoute>
            <Workers />
          </PrivateRoute>
      },
      {
        path: "/administrar",
        element:
          <PrivateRoute>
            <Administrator />
          </PrivateRoute>,
          children:[{
            path:"precios-cliente",
            element:<PreciosPorCliente/>
          }]
      }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
