import React from 'react';
import Sidebar from './SIdebar';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: '150px' }}>
        {/* Navbar superior fija */}
        <nav className="navbar navbar navbar-light bg-light fixed-top" style={{ marginLeft: '250px' }}>
          <div className="container-fluid">
            <span className="navbar-brand" style={{ color: 'black', fontSize: '30px', fontWeight: 'bold', textDecoration: 'none', transform: 'unset', marginInlineStart: '250px' }}>SISTEMA VETERINARIA</span>
          </div>
        </nav>

        {/* Contenido con margen superior para no quedar debajo del navbar */}
        <div className="p-4" style={{ marginTop: '70px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
