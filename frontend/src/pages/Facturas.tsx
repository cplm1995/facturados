import React, { useState } from 'react';

const FacturaCompleta = () => {
  // Estados
  // Factura
  // Cliente
  // Productos  
  const [factura, setFactura] = useState({
    numero: '',
    fechaVencimiento: '',
    fechaEmision: '',
    fecha: '',
    tipo: '',
    medioPago: '',
  });

  const [cliente, setCliente] = useState({
    nombre: '',
    identificacion: '',
    direccion: '',
    email: ''
  });

  // Definición de tipos para los productos
  interface Producto {
    codigo: string;
    nombre: string;
    cantidad: number;
    precio: number;
    iva: number;
    unidad: string;
    codigoEstandar: number;
    excluido: string;
    tributo: string;
  }
  type Productos = Producto[];

  const [productos, setProductos] = useState<Productos>([]);

  const [nuevoProducto, setNuevoProducto] = useState({
    codigo: '',
    nombre: '',
    cantidad: 0,
    precio: 0,
    iva: 0,
    unidad: '',
    codigoEstandar: 0,
    excluido: '',
    tributo: ''
  });

  // Manejo de cambios generales
  const handleFacturaChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value });
  };

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleProductoChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value });
  };

  const handleAgregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto({
      codigo: '',
      nombre: '',
      cantidad: 0,
      precio: 0,
      iva: 0,
      unidad: '',
      codigoEstandar: 0,
      excluido: '',
      tributo: ''
    });
  };

  const calcularSubtotal = () => {
    return productos.reduce((acc, prod) => {
      const precio = prod.precio || 0;
      const cantidad = prod.cantidad || 1;
      return acc + precio * cantidad;
    }, 0);
  };

  const calcularTotal = () => {
    return productos.reduce((acc, prod) => {
      const precio = prod.precio || 0;
      const cantidad = prod.cantidad || 1;
      const iva = prod.iva || 0;
      return acc + precio * cantidad * (1 + iva / 100);
    }, 0);
  };

  const handleGuardarFactura = () => {
    const datosFactura = {
      factura,
      cliente,
      productos,
      resumen: {
        subtotal: calcularSubtotal(),
        total: calcularTotal()
      }
    };

    console.log("Datos completos de la factura:", datosFactura);
    alert("Factura completa capturada. Revisa la consola.");
  };
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="alert alert-info alert-dismissible fade show col-md-10" role="alert">
          Bienvenidos a Facturas
        </div>
        <section className="col col-md-10">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Datos factura
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Datos cliente
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Datos productos
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
              </div>
            </div>
            <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                Datos expedir la factura
              </button>
            </h2>
            <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
            </div>
          </div>
          </div>
          <button id='btnGuardarFactura' onClick={handleGuardarFactura} type='button' className='btn btn-outline-primary'>Guardar Factura</button>
          <button id='btnCancelarFactura' type='button' className='btn btn-outline-danger'>Cancelar</button>
        </section>
      </div>

    </>
  );
};
export default FacturaCompleta;
