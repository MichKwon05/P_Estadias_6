import React, { useMemo, useState } from 'react';
import { Container, Modal, Card, Col, Row, Badge, Button, Form, InputGroup } from 'react-bootstrap'
import DataTable, { createTheme } from 'react-data-table-component'
import '../../../shared/plugins/Screens.css'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const CitaScreen = () => {

  /*Cargar Ventanilla */
  const [data, setData] = useState([
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true },
    { id: 1, name: 'Rafael', apellido1: 'Rodriguez', apellido2: 'Trejo', email: 'rafatrejo1@gmail.com', contrasena: 'rafa12', status: true }

  ]);
  const [idAdmi, setIDAdmin] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: item.status === 'Activo' ? 'Inactivo' : 'Activo' } : item
      )
    );
  };

  const handleEdit = (id) => {
    // Lógica para editar un elemento
    console.log('Editar elemento con ID:', id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*Intento de modal */

  const [isLoading, setIsLoading] = useState('');
  const [mode, setMode] = useState('');
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (mode) => {

    if (mode === "look") {
      setTitle('Datos de la cita');

    }
    /*window.setTimeout(function(){
        document.getElementById(`nombre`).focus();
    },500);*/
    setShow(true);
  }

  /// VALIDAR CON DEFAULT
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  ////
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <>
      <div className="container">
        <div className="table-container">
          <div className="table-wrapper">
            <table className="table rounded-border">
              <thead style={{ textAlign: 'center' }}>
              <tr>
                  <th colSpan="7" style={{ fontSize: '24px', fontWeight: 'bold' }}>CITAS</th>
                </tr>
                <tr>
                  {/*<th>ID</th>*/}
                  <th>Matrícula solicitante</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  {/*<th>Número V</th>*/}
                  <th>Servicio</th>
                  <th>Documento</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>No hay registros</td>
                  </tr>
                ) : (data.map((item) => (
                  <tr key={item.id} style={{ border: 'none' }} className='mb-4'>
                    {/*<td className="rounded-border">{item.id}</td>*/}
                    <td className="rounded-border"></td>
                    <td className="rounded-border"></td>
                    <td className="rounded-border"></td>
                    <td className="rounded-border"></td>
                    <td className="rounded-border"></td>
                    <td className="rounded-border"></td>
                    <td style={{ background: '#2A4172', border: 'none' }}>
                      <button className="btn-b">
                        <FeatherIcon
                          icon='clipboard'
                          style={{ color: 'black' }}
                          onClick={() => handleShow('look')}
                        />
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottom-section">
          <input type="text" placeholder="Buscar" />
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='titleModal' style={{ backgroundColor: '#58BEC4', color: 'white' }}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form /*noValidate validated={validated}*/ onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label style={{ color: '#2A4172' }}><b>Matrícula</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={nombre} onChange={(e) => setNombre(e.target.value)}
                //placeholder="First name"
                />
                {/*<Form.Control.Feedback>Completado</Form.Control.Feedback>*/}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Paterno</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={apellidoP} onChange={(e) => setApellidoP(e.target.value)}
                //placeholder="Last name"
                />

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Materno</b></Form.Label>
                <Form.Control type="text" required
                  value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label style={{ color: '#2A4172' }}><b>Correo</b></Form.Label>
                <Form.Control type="text" required
                  value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="7" controlId="validationCustom09">
                <Form.Label style={{ color: '#2A4172' }}><b>Contraseña</b></Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="1" controlId="validationCustom10">
                <Form.Label style={{ color: 'white' }}>P</Form.Label>
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "#375689",
                    borderLeft: "none",
                    width: "fit-content", /* Ajusta el ancho del botón al contenido */
                    padding: "0.25rem", /* Ajusta el padding del botón */
                  }}
                  onClick={togglePassword}
                >
                  <FeatherIcon
                    style={{
                      stroke: 'white',
                      fontSize: '1.2em', /* Ajusta el tamaño del ícono */
                    }}
                    icon={showPassword ? 'eye-off' : 'eye'}
                  />
                </Button>
              </Form.Group>
            </Row>

            <Button className='me-2' variant='outline-danger' onClick={handleClose}>
              <FeatherIcon icon='x' />&nbsp;Cerrar
            </Button>

            <Button variant="outline-success" type='button' /*onClick={() => validar()}*/>
              <FeatherIcon icon='check' />&nbsp;Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default CitaScreen