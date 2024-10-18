import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Users, ShoppingCart, DollarSign, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Punto de Venta</Link>
        <div className="flex space-x-4">
          <Link to="/empresas" className="flex items-center"><Store className="mr-1" size={18} /> Empresas</Link>
          <Link to="/usuarios" className="flex items-center"><Users className="mr-1" size={18} /> Usuarios</Link>
          <Link to="/productos" className="flex items-center"><ShoppingCart className="mr-1" size={18} /> Productos</Link>
          <Link to="/ventas" className="flex items-center"><DollarSign className="mr-1" size={18} /> Ventas</Link>
          <Link to="/login" className="flex items-center"><LogOut className="mr-1" size={18} /> Salir</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;