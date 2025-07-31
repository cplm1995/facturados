import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaPaw, FaCalendarAlt, FaUser, FaDog, FaTachometerAlt, FaFileInvoiceDollar } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const closeSidebar = () => {
    if (window.innerWidth < 992) {
      setCollapsed(true);
    }
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className="btn btn-dark d-lg-none position-fixed m-3"
        onClick={toggleSidebar}
        style={{ zIndex: 2000 }}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white position-fixed top-0 start-0 h-100 p-3 ${collapsed ? 'd-none d-lg-block' : ''}`}
        style={{ width: '250px', zIndex: 1050 }}
      >
        <h5 className="mb-4 d-flex align-items-center">
          <span className="me-2"><FaPaw /></span> Veterinaria
        </h5>

        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link text-white" onClick={closeSidebar}>
              <span className="me-2"><FaTachometerAlt /></span> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/citas" className="nav-link text-white" onClick={closeSidebar}>
              <span className="me-2"><FaCalendarAlt /></span> Citas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mascotas" className="nav-link text-white" onClick={closeSidebar}>
              <span className="me-2"><FaDog /></span> Mascotas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/clientes" className="nav-link text-white" onClick={closeSidebar}>
              <span className="me-2"><FaUser /></span> Clientes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/facturas" className="nav-link text-white" onClick={closeSidebar}>
              <span className="me-2"><FaFileInvoiceDollar /></span> Facturas
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
