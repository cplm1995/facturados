import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import numeracionData from '../data/numeracionData.json';



const FacturaCompleta = () => {
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [digitoVerificador, setDigitoVerificador] = useState('');
  const [seleccionado, setSeleccionado] = useState('');
  const [numeracion, setNumeracion] = useState(numeracionData);


  // Productos  
  const [factura, setFactura] = useState({
    numero: '',
    fechaVencimiento: '',
    fechaEmision: '',
    fecha: '',
    tipo: '',
    medioPago: '',
    observacion: '',
    numeroOrden: '',
  });

  const [cliente, setCliente] = useState({
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    digitoVerificador: '',
    razonSocial: '',
    nombreComercial: '',
    nombreCliente: '',
    nombre: '',
    identificacion: '',
    direccion: '',
    email: '',
    telCliente: '',
    tipoOrganizacion: '',
    tipoTributo: '',
    municipio: '',

  });

  useEffect(() => {
    setNumeracion(numeracionData); // cargamos los datos al montar el componente
  }, []);

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
    descuentos: 0,
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
      descuentos: 0, // This line was causing the error
      iva: 0,
      unidad: '',
      codigoEstandar: 0,
      excluido: '',
      tributo: ''
    });
  };

  // Manejar selección del curso
  const manejarCambioSeleccionado = (e) => {
    setSeleccionado(e.target.value);
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
                <div className="accordion-body">
                  <div className="row" >
                    <div className="col">
                      <label htmlFor="numeracion">Rango de Numeración</label>
                      <select className="form-select" aria-label="Rango-numeracion" value={seleccionado} onChange={manejarCambioSeleccionado}>
                        <option value="">Open this select menu</option>
                        {numeracion.data.map((num) => (
                          <option key={num.id} value={num.id}>
                            {num.document}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="nombre">Numero</label>
                      <input type="number" className="form-control" id="nombreProducto" name="nombre" value={
                        numeracion.data.find(num => num.id === parseInt(seleccionado))?.to || ''
                      } onChange={manejarCambioSeleccionado} disabled
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="observacion">Observacion</label>
                      <textarea className="form-control" id="observacion" name="observacion" value={factura.observacion} onChange={handleFacturaChange}></textarea>
                    </div>
                    <div className="col">
                      <label htmlFor="formaPago">Forma de pago</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        <option value="1">Pago de contado</option>
                        <option value="2">Pago a crédito</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <label htmlFor="metodoPago">Metodo de pago</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        <option value="10">Efectivo</option>
                        <option value="42">Consignación</option>
                        <option value="20">Cheque</option>
                        <option value="71">Bonos</option>
                        <option value="72">Vales</option>
                        <option value="1">Medio de pago no definido</option>
                        <option value="49">Tarjeta Débito</option>
                        <option value="48">Tarjeta Crédito</option>
                        <option value="ZZZ">Otro*</option>
                      </select>
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="tipoOperacion">Tipo de operación</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        <option value="10">Estandar</option>
                        <option value="11">Mandatos</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <label htmlFor="metodoPago">Fecha emisión</label>
                      <input type="date" name="fechaEmision" className="form-control" id="fechaEmision" value={factura.fechaEmision} onChange={handleFacturaChange} />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="fechaVencimiento">Fecha vencimiento</label>
                      <input type="date" name="fechaVencimiento" className="form-control" id="fechaVencimiento" value={factura.fechaVencimiento} onChange={handleFacturaChange} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <label htmlFor="numeroOrden">Número de orden</label>
                      <input type="text" name="numeroOrden" className="form-control" id="numeroOrden" value={factura.numeroOrden} onChange={handleFacturaChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Datos cliente*/}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Datos cliente
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row mt-1">
                    <div className="col">
                      <label htmlFor="tipoIdentificacion">Tipo de Documento</label>
                      <select className="form-select" aria-label="Default select example"
                        name='tipoIdentificacion'
                        value={tipoDocumento}
                        onChange={(e) => {
                          setTipoDocumento(e.target.value);
                          handleClienteChange(e);
                        }}
                        >
                        <option selected>[Seleccione]</option>
                        <option value="1">Registro civil</option>
                        <option value="2">Tarjeta de identidad</option>
                        <option value="3">Cédula de ciudadanía</option>
                        <option value="4">Tarjeta de extranjería</option>
                        <option value="5">Cédula de extranjería</option>
                        <option value="6">NIT</option>
                        <option value="7">Pasaporte</option>
                        <option value="8">Documento de identificación extranjero</option>
                        <option value="9">PEP</option>
                        <option value="10">NIT otro país</option>
                        <option value="11">NUIP*</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="numeroIdentificacion">Número de documento</label>
                      <input type="text" className="form-control" id="numeroIdentificacion" name="numeroIdentificacion" value={cliente.numeroIdentificacion} onChange={handleClienteChange} />
                    </div>
                    {/* Campo dinámico: solo aparece si seleccionan NIT */}
                    {tipoDocumento === '6' && (
                      <div className="col-sm-2">
                        <label htmlFor="digitoVerificador">DV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="digitoVerificador"
                          name="digitoVerificador"
                          maxLength={1}
                          value={digitoVerificador}
                          onChange={(e) => {
                            setDigitoVerificador(e.target.value)
                            handleClienteChange(e);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="razonSocial">Razón Social</label>
                      <input type="text" className="form-control" id="razonSocial" name="razonSocial" value={cliente.razonSocial} onChange={handleClienteChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="nombreComercial">Nombre Comercial</label>
                      <input type="text" className="form-control" id="nombreComercial" name="nombreComercial" value={cliente.nombreComercial} onChange={handleClienteChange} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="nombreCliente">Nombre Cliente</label>
                      <input type="text" className="form-control" id="nombreCliente" name="nombreCliente" value={cliente.nombreCliente} onChange={handleClienteChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="direccion">Direccíon</label>
                      <input type="text" className="form-control" id="direccion" name="direccion" value={cliente.direccion} onChange={handleClienteChange} />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <label htmlFor="email">Correo electrónico</label>
                      <input type="text" className="form-control" id="email" name="email" value={cliente.email} onChange={handleClienteChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="telCliente">Telefono</label>
                      <input type="tel" className="form-control" id="telCliente" name="telCliente" value={cliente.telCliente} onChange={handleClienteChange} />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col">
                      <label htmlFor="tipoIdentificacion">Tipo de Organización</label>
                      <select className="form-select" aria-label="Default select example" name='tipoOrganizacion' value={cliente.tipoOrganizacion} onChange={handleClienteChange}>
                        <option selected>[Seleccione]</option>
                        <option value="1">Persona Juridica</option>
                        <option value="2">Persona Natural</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="numeroIdentificacion">Tipo de tributo</label>
                      <select className="form-select" aria-label="Default select example" name='tipoTributo' value={cliente.tipoTributo} onChange={handleClienteChange}>
                        <option selected>[Seleccione]</option>
                        <option value="18">IVA</option>
                        <option value="21">No aplica*</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-sm-6">
                      <label htmlFor="municipio">Municipio</label>
                      <select className="form-select" aria-label="Default select example" name='municipio' value={cliente.municipio} onChange={handleClienteChange}>
                        <option selected>[Seleccione]</option>
                        <option value="1">Medellín</option>
                        <option value="2">Bogotá</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Datos Generales del Producto*/}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Datos productos
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row" >
                    <div className="col">
                      <label htmlFor="codigo">Código</label>
                      <input type="text" className="form-control" id="codigo" name="codigo" value={nuevoProducto.codigo} onChange={handleProductoChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="nombre">Nombre Producto</label>
                      <input type="text" className="form-control" id="nombreProducto" name="nombre" value={nuevoProducto.nombre} onChange={handleProductoChange} />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="cantidad">Cantidad</label>
                      <input type="text" className="form-control" id="cantidad" name="cantidad" value={nuevoProducto.cantidad} onChange={handleProductoChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="precio">Precio</label>
                      <input type="number" className="form-control text-end" id="precio" name="precio" value={nuevoProducto.precio} onChange={handleProductoChange} />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="descuentos">Porcentaje descuento</label>
                      <input type="text" className="form-control" id="descuentos" name="descuentos" value={nuevoProducto.descuentos} onChange={handleProductoChange} />
                    </div>
                    <div className="col">
                      <label htmlFor="impuesto">Impuesto</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Seleccione</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="unidadMedida">Unidad de medida</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Seleccione</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="unidadMedida">Código estandar</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="exclusionIva">¿Excluido del IVA?</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        <option value="true">Si</option>
                        <option value="false">No</option>

                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="tipoTributo">Tipo tributo</label>
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Seleccione</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                  {/* Botón para agregar productos */}
                  <button id='btnAgregarProducto' onClick={handleAgregarProducto} type='button' className='btn btn-outline-primary'><FontAwesomeIcon icon={faPlus} />
                    Agregar Producto
                  </button>
                  <table className='table table-striped' id='tablaProductos'>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Impuesto</th>
                        <th>Unidad</th>
                        <th>Código estandar</th>
                        <th>Excluido</th>
                        <th>Tributo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos.map((producto, index) => (
                        <tr key={index}>
                          <td>{producto.codigo}</td>
                          <td>{producto.nombre}</td>
                          <td>{producto.cantidad}</td>
                          <td>{producto.precio}</td>
                          <td>{producto.iva}</td>
                          <td>{producto.unidad}</td>
                          <td>{producto.codigoEstandar}</td>
                          <td>{producto.excluido}</td>
                          <td>{producto.tributo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/*Datos generales de la factura como: Subtotal y Total */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Datos expedir la factura
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row col-sm-4" id='inpusFacturas'>
                    <div className="form-group">
                      <label htmlFor="subTotal">Subtotal</label>
                      <input type="text" className="form-control text-end" id="subTotal" name="subTotal" value={calcularSubtotal()} readOnly />
                    </div>
                    <div className="form-group">
                      <label htmlFor="total">Total</label>
                      <input type="text" className="form-control text-end" id="total" name="total" value={calcularTotal()} readOnly />
                    </div>
                  </div>
                </div>
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
