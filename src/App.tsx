import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Empresas from './pages/Empresas';
import Sucursales from './pages/Sucursales';
import Usuarios from './pages/Usuarios';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/sucursales" element={<Sucursales />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/compras" element={<Compras />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;