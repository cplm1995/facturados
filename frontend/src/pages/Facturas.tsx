import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import numeracionData from '../data/numeracionData.json'
import tributosProductos from '../data/tributosProductos.json'
import municipios from '../data/municipios.json'


interface Numeracion {
  id: number;
  document: string;
  prefix: string;
  current: number;
}

interface Producto {
  codigo: string;
  cantidad: number;
  nombreProducto: string;
  precioUnitario: number;
  iva: string;
  unidadMedida: string;
  codigoEstandar: string;
  excluidoIva: string;
  tributo: string;

}


const Facturas = () => {
  const [tributos, setTributos] = useState<any[]>([]);
  const [seleccionado, setSeleccionado] = useState<string>('');
  const [municipiosData, setMunicipiosData] = useState<any[]>([]);
  const [numeracion, setNumeracion] = useState<Numeracion[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [codigo, setCodigo] = useState<string>('');
  const [nombreProducto, setNombreProducto] = useState<string>('');
  const [cantidad, setCantidad] = useState<string>('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [iva, setIva] = useState<string>('');
  const [unidadMedida, setUnidadMedida] = useState<string>('');
  const [codigoEstandar, setCodigoEstandar] = useState<string>('');
  const [excluidoIva, setExcluidoIva] = useState<string>('');
  const [tributo, setTributo] = useState<string>('');
  const [total, setTotal] = useState<number>(0);
  const [formaPago, setFormaPago] = useState<string>('');
  const [metodoPago, setMetodoPago] = useState<string>('');
  const [fechaEmision, setFechaEmision] = useState<string>('');
  const [ordenCompra, setOrdenCompra] = useState<string>('');
  const [tipoDocumentoCliente, setTipoDocumentoCliente] = useState<string>('');
  const [numeroDocumentoCliente, setNumeroDocumentoCliente] = useState<string>('');
  const [tipoOrganizacion, setTipoOrganizacion] = useState<string>('');
  const [nombreComercial, setNombreComercial] = useState<string>('');
  const [nombresRepresentante, setNombresRepresentante] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [direccion, setDireccion] = useState<string>('');
  const [subTotal, setSubTotal] = useState<number>(0);
  const [fechaVencimiento, setFechaVencimiento] = useState<string>('');
  const [tipoDocumentoNumeracion, setTipoDocumentoNumeracion] = useState<string>('');
  const [rangoNumeracion, setRangoNumeracion] = useState<string>('');
  const [tipoTri, setTipoTri] = useState<string>('');


  useEffect(() => {
    setTributos(tributosProductos.data); // cargamos los datos al montar el componente
    setMunicipiosData(municipios.data);
    setNumeracion(numeracionData.data);
  }, []);

  const manejarCambio = (e) => {
    setSeleccionado(e.target.value);
  };

  //Manejamos la captura de datos del formulario
  const captuDatosFacturaSubmit = (e) => {
    e.preventDefault();
    // Define these variables or ensure they are in scope
    const tipoDocumentoNumeracion = seleccionado; // Assuming 'seleccionado' holds the type of document
    const rangoNumeracion = ''; // Placeholder, replace with actual state or value
    const tipoTributo = seleccionado; // Assuming 'seleccionado' holds the type of tax
    try {
      const datosFactura = {
        tipoDocumentoNumeracion, // Assuming 'seleccionado' holds the type of document for numeration
        rangoNumeracion,
        tipoTributo,
        formaPago,
        metodoPago,
        fechaEmision,
        ordenCompra,
        fechaVencimiento,
        tipoDocumentoCliente, // Add this line
        numeroDocumentoCliente, // Add this line
        tipoOrganizacion,
        nombreComercial,
        nombresRepresentante,
        email,
        telefono,
        direccion, // Add this line
        municipios,
        codigo,
        nombreProducto,
        cantidad,
        precioUnitario,
        iva,
        unidadMedida,
        codigoEstandar,
        excluidoIva,
        tributo,
        subTotal,
        total: 0, // Initialize total with a default value
      };
      console.log(datosFactura)

    }catch (error){
      console.log(error);
    }
  } ;

  const agregarProductoTabla = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productoTabla: Producto = {
        codigo,
        nombreProducto,
        cantidad: parseFloat(cantidad),
        precioUnitario: parseFloat(precioUnitario) * parseFloat(cantidad),
        iva,
        unidadMedida,
        codigoEstandar,
        excluidoIva,
        tributo,
      }
      setProductos([...productos, productoTabla]);
      //limpiamos la tabla
      setCodigo('');
      setNombreProducto('');
      setCantidad('');
      setPrecioUnitario('');
      setIva('');
      setUnidadMedida('');
      setCodigoEstandar('');
      setExcluidoIva('');
      setTributo('');
    } catch { }

  }

  return (
    <>
      <Layout>
        <div className="alert text-center" role="alert" style={{ fontSize: '20px', textTransform: 'uppercase', fontWeight: 'bold', }}>
          Bienvenidos a Facturas
        </div>
        <form onSubmit={captuDatosFacturaSubmit}>
          <div className="accordion accordion-flush accordion-btn-bg-success" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  Datos de la factura
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="tipoDocuNumeracion" className="form-label">Tipo de documento</label>
                      <select value={tipoDocumentoNumeracion} onChange={(e) => setTipoDocumentoNumeracion(e.target.value)} className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        <option value="1">Factura electrónica de venta</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="rangoNumeracion" className="form-label">Rango de Númeración</label>
                      <select className="form-select" aria-label="Default select example" value={rangoNumeracion} onChange={(e) => setRangoNumeracion(e.target.value)} >
                        <option selected>[Seleccione]</option>
                        <option value="21">Factura de venta</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="numeracion" className="form-label">Númeración</label>
                      <select value={seleccionado} onChange={manejarCambio} className="form-select" aria-label="Default select example">
                        <option selected>[Seleccione]</option>
                        {numeracion.map((numero) => (
                          <option key={numero.id} value={numero.prefix}>{numero.current}</option>

                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col">
                      <label htmlFor="formaPago" className="form-label">Formas de pago</label>
                      <select className="form-select" aria-label="Default select example" value={formaPago} onChange={(e) => setFormaPago(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="1">Pago de contado</option>
                        <option value="2">Pago a crédito</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="metodoPago" className="form-label">Método de pago</label>
                      <select className="form-select" aria-label="Default select example" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} >
                        <option selected>[Seleccione]</option>
                        <option value="10">Efectivo</option>
                        <option value="42">Consignación</option>
                        <option value="20">Cheque</option>
                        <option value="47">Transferencia</option>
                        <option value="71">Bono</option>
                        <option value="72">Vales</option>
                        <option value="1">Medio de pago no definido</option>
                        <option value="49">Tarjeta Débito</option>
                        <option value="48">Tarjeta Crédito</option>
                        <option value="ZZZ">Otro*</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="fechaEmision" className="form-label">Fecha de emisión</label>
                      <input type="date" className="form-control" placeholder="Last name" aria-label="Last name" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col">
                      <label htmlFor="ordenCompra" className="form-label">Orde de Compra</label>
                      <input type="text" className='form-control' placeholder='' value={ordenCompra} onChange={(e) => setOrdenCompra(e.target.value)} />
                    </div>
                    <div className="col">
                      <label htmlFor="fechaVencimiento" className="form-label">Fecha de vencimiento</label>
                      <input type="date" className="form-control" placeholder="Last name" aria-label="Last name" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Datos del cliente
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className='row'>
                    <div className="col col-sm-6">
                      <label htmlFor="tipoDocumentoCliente" className="form-label">Tipo de documento</label>
                      <select className="form-select" aria-label="Default select example" value={tipoDocumentoCliente} onChange={(e) => setTipoDocumentoCliente(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="1">Registro civil</option>
                        <option value="2">Tarjeta de identidad</option>
                        <option value="3">Cédula de ciudadanía</option>
                        <option value="4">Tarjeta de extranjería</option>
                        <option value="5">Cédula de extranjería</option>
                        <option value="6">Nit</option>
                        <option value="7">Pasaporte</option>
                        <option value="8">Documento de identificación extranjero</option>
                        <option value="9">PEP</option>
                        <option value="10">NIT otro país</option>
                        <option value="11">NUIP*</option>
                      </select>
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="numeroDocumentoCliente" className="form-label">Número de documento</label>
                      <input type="text" className="form-control" placeholder="Número de documento" aria-label="Last name" value={numeroDocumentoCliente} onChange={(e) => setNumeroDocumentoCliente(e.target.value)} />
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="tipoOrganizacion" className="form-label">Tipo de organización</label>
                      <select className="form-select" aria-label="Default select example" value={tipoOrganizacion} onChange={(e) => setTipoOrganizacion(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="1">Persona Jurídica</option>
                        <option value="2">Persona Natural</option>
                      </select>
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="tipoTributo" className="form-label">Tipo de tributo</label>
                      <select className="form-select" aria-label="Default select example" value={tipoTri} onChange={(e) => setTipoTri(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="1">IVA</option>
                        <option value="2">No aplica</option>
                      </select>
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="nombre-comercial" className="form-label">Nombre comercial</label>
                      <input type="text" className="form-control" placeholder="Nombre comercial" aria-label="Last name" value={nombreComercial} onChange={(e) => setNombreComercial(e.target.value)} />
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="nombre-representante" className="form-label">Nombres del representante legal</label>
                      <input type="text" className="form-control" placeholder="Nombres del representante legal" aria-label="Nombre representante legal" value={nombresRepresentante} onChange={(e) => setNombresRepresentante(e.target.value)} />
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" placeholder="Input email" aria-label="Last name" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="telephone" className="form-label">Telefono</label>
                      <input type="tel" className="form-control" placeholder="Ingrese teléfono" aria-label="Last name" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="address" className="form-label">Dirección</label>
                      <input type="text" className="form-control" placeholder="Ingrese dirección" aria-label="Last name" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="municipale" className="form-label">Municipio</label>
                      <select value={seleccionado} onChange={manejarCambio} className="form-select" aria-label="Municipio">
                        <option selected>[Seleccione municipio]</option>
                        {municipiosData.map((municipio) => (
                          <option key={municipio.id} value={municipio.code}>{municipio.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Detalles del producto / servicio
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <div className='row'>
                    <div className="col col-sm-6">
                      <label htmlFor="code" className="form-label">Codigo</label>
                      <input type="text" className="form-control" placeholder="Ingrese código" aria-label="code" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="nombreProducto" className="form-label">Nombre producto / servicio</label>
                      <input type="text" className="form-control" placeholder="Ingrese nombre producto / servicio" aria-label="nombreProducto" value={nombreProducto} onChange={(e) => setNombreProducto(e.target.value)} />
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="cantidad" className="form-label">Cantidad</label>
                      <input type="number" className="form-control" placeholder="Ingrese código" aria-label="code" value={cantidad} onChange={(e) => setCantidad((e.target.value))} />
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="precioUnitario" className="form-label">Precio unitario</label>
                      <input type="number" className="form-control" placeholder="Ingrese precio" value={precioUnitario} onChange={(e) => setPrecioUnitario((e.target.value))} aria-label="precio" />
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="iva" className="form-label">%Iva</label>
                      <select className="form-select" aria-label="Default select example" value={iva} onChange={(e) => setIva(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="1">19%</option>
                        <option value="2">20%</option>
                      </select>
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="unidad-medida" className="form-label">Unidad de Medida</label>
                      <select className="form-select" aria-label="Default select example" value={unidadMedida} onChange={(e) => setUnidadMedida(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="94">Unidad</option>
                        <option value="KGM">Kilogramo</option>
                        <option value="LBR">Libra</option>
                        <option value="MTR">Metro</option>
                        <option value="GLL">Galón</option>
                      </select>
                    </div>
                  </div>
                  <div className='row' style={{ marginTop: '20px' }}>
                    <div className="col col-sm-6">
                      <label htmlFor="codigo-estandar" className="form-label">Código estandar</label>
                      <select className="form-select" aria-label="Default select example" value={codigoEstandar} onChange={(e) => setCodigoEstandar(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        <option value="Estandar">1 - Estándar de adopción del contribuyente</option>
                        <option value="UNSPSC">2 - UNSPSC</option>
                        <option value="Partida Arancelaria">3 - Partida Arancelaria</option>
                        <option value="GTIN">4 - GTIN</option>
                      </select>
                    </div>
                    <div className="col col-sm-6">
                      <label htmlFor="exclusion-iva" className="form-label">¿Excluido de iva?</label>
                      <select className="form-select" aria-label="Default select example" value={excluidoIva} onChange={(e) => setExcluidoIva(e.target.value)}>
                        <option selected={true}>[Seleccione]</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                    <div className="col col-sm-6" style={{ marginTop: '20px' }}>
                      <label htmlFor="tributo" className="form-label">Tributo</label>
                      <select className="form-select" aria-label="Default select example" value={tributo} onChange={(e) => setTributo(e.target.value)}>
                        <option selected>[Seleccione]</option>
                        {tributos.map((tributo) => (
                          <option key={tributo.id} value={tributo.code}>{tributo.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="p-4">
                      <div className="group">
                        <button className='btn btn-primary w-full mt-3 mb-3' onClick={agregarProductoTabla}>
                          Agregar
                        </button>
                      </div>

                      <table className="table table-striped w-full text-center">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Codigo value{codigo}</th>
                            <th className="border px-4 py-2">Nombre producto / servicio</th>
                            <th className="border px-4 py-2">Cantidad</th>
                            <th className="border px-4 py-2">Precio unitario</th>
                            <th className="border px-4 py-2">Iva</th>
                            <th className="border px-4 py-2">Unidad de Medida</th>
                            <th className="border px-4 py-2">Código estandar</th>
                            <th className="border px-4 py-2">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((prod, index) => (
                            <tr key={index}>
                              <td>{prod.codigo}</td>
                              <td>{prod.nombreProducto}</td>
                              <td>{prod.cantidad}</td>
                              <td>{prod.precioUnitario}</td>
                              <td>{prod.iva}</td>
                              <td>{prod.unidadMedida}</td>
                              <td>{prod.codigoEstandar}</td>
                              <td>
                                <button

                                  className="btn btn-danger btn-sm text-white px-2 py-1 rounded"
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                          {productos.length === 0 && (
                            <tr>
                              <td colSpan={8} className="text-center py-2">
                                No hay productos agregados
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="alert text-center" role="alert" style={{ fontSize: '20px', textTransform: 'uppercase', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>
                      Bienvenidos a Facturas
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                      <div className="col col-sm-6">
                        <label htmlFor="subTotal" className="form-label">Subtotal</label>
                        <input type="text" className='form-control' placeholder='Subtotal' disabled />
                      </div>
                      <div className="col col-sm-6">
                        <label htmlFor="total" className="form-label">Total factura</label>
                        <input type="text" className='form-control' placeholder='total' readOnly />
                      </div>
                    </div>
                    <button className='btn btn-primary w-30 mt-3 mb-3 aling-content-start' type='submit'>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form >
      </Layout >
    </>
  )
}

export default Facturas