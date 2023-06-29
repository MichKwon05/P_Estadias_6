import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Card, Col, Row, Badge, Button, Form, InputGroup } from 'react-bootstrap'
import DataTable, { createTheme } from 'react-data-table-component'
import '../../../shared/plugins/Screens.css'

import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import Swal from 'sweetalert2';


const VentanillaScreen = () => {

  const navigate = useNavigate();
  const urlVenta = `http://localhost:8080/api/ventanilla/`

  /*Cargar Ventanilla */
  const [vetanilla, setVentanilla] = useState([]);
  const [admin, setAdmin] = useState([]);

  const [id, setId] = useState('');
  const [nombreVent, setNombreVent] = useState('');
  const [apePaternoVent, setApePaternoVent] = useState('');
  const [apeMaternoVent, setApeMaternoVent] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [passVent, setPassVent] = useState('');
  const [status, setStatus] = useState('');

  const [adminId, setAdminId] = useState(1);

  useEffect(() => {
    cargarVentanilla();
    cargarAdmin();
  }, []);

  const cargarVentanilla = async () => {
    try {
      const respuesta = await axios.get(urlVenta);
      setVentanilla(respuesta.data);
      console.log(respuesta.data)
      //console.clear();
    } catch (error) {
      console.log('Error:', error.message);
      // Otro manejo de errores
    }
  };

  const cargarAdmin = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:8080/api/administrador/`);
      setAdmin(respuesta.data);
      //console.log(respuesta.data)
      //console.clear();
    } catch (error) {
      console.log('Error:', error.message);
      // Otro manejo de errores
    }
  };

  /*Intento de modal */

  const [isLoading, setIsLoading] = useState('');
  const [mode, setMode] = useState('');
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = (mode, id, nombreVent, apePaternoVent, apeMaternoVent,
    correoElectronico, passVent, status) => {
    setId('');
    setNombreVent('');
    setApePaternoVent('');
    setApeMaternoVent('');
    setCorreoElectronico('');
    setPassVent('');
    setStatus(true);
    setMode(mode);
    if (mode === "add") {
      setTitle('Registrar ventanilla');
    } else if (mode === "edit") {
      setTitle('Editar ventanilla');
      setId(id);
      setNombreVent(nombreVent);
      setApePaternoVent(apePaternoVent);
      setApeMaternoVent(apeMaternoVent);
      setCorreoElectronico(correoElectronico);
      setPassVent(passVent);
      setAdminId(adminId);
      setStatus(status);
      
    }
    /*window.setTimeout(function(){
        document.getElementById(`nombre`).focus();
    },500);*/
    setShow(true);
  }

  const validar = (e) => {
    var parametros;
    var metodo;
    var modo = mode; // Agregar variable local para guardar mode
    if (![nombreVent, apePaternoVent, /*apeMaternoVent*/, correoElectronico, passVent].every(field => field !== '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (modo === "add") {
        parametros = {
          nombreVent: nombreVent.trim(), apePaternoVent: apePaternoVent.trim(), apeMaternoVent: apeMaternoVent.trim(),
          correoElectronico: correoElectronico.trim(), passVent: passVent.trim(), status: status, admin: { id: admin.id } 
        };
        metodo = 'POST';
      } else {
        parametros = {
          id: id, nombreVent: nombreVent.trim(), apePaternoVent: apePaternoVent.trim(), apeMaternoVent: apeMaternoVent.trim(),
          correoElectronico: correoElectronico.trim(), passVent: passVent.trim(), status: status, admin: { id: admin.id } 
        };
        metodo = 'PUT';
      }
      enviarSolicitud(metodo, parametros);
    }
  }

  const enviarSolicitud = async (metodo, parametros) => {
    if (metodo === 'PUT') {
      await axios({ method: metodo, url: `http://localhost:8080/api/ventanilla/${id}`, data: parametros })
        .then(function (respuesta) {
          var hasError = respuesta.data.status;
          var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Ventanilla actualizada correctamente',
            text: 'Ventanilla: ' + nombreVent + ' ' + apePaternoVent,
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarAdmin();
            handleClose();
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#264B99',
            title: 'Error en la petición',
            showConfirmButton: false,
            timer: 1500
          });
          /*handleClose();
          console.log(error);
          Promesa cumple y sale
          */
        })
        .finally(function () {
          cargarVentanilla();
          handleClose();
        });
    } else if (metodo === 'DELETE') {
      await axios({ method: metodo, url: `http://localhost:8080/api/ventanilla/${parametros.id}` })
        .then(function (respuesta) {
          var hasError = respuesta.data.status;
          var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Ventanilla eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarVentanilla();
            handleClose();
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#264B99',
            title: 'Error en la petición',
            showConfirmButton: false,
            timer: 1500
          });
          handleClose();
          console.log(error);
        })
        .finally(function () {
          cargarVentanilla();
          handleClose();
        });
    } else {
      await axios({ method: metodo, url: urlVenta, data: parametros })
        .then(function (respuesta) {

          var hasError = respuesta.data.status;
          var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Ventanilla registrada corrrectamente',
            text: 'Ventanilla: ' + nombreVent + ' ' + apePaternoVent,
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarAdmin();
            handleClose();
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#264B99',
            title: 'Error en la petición',
            showConfirmButton: false,
            timer: 1500
          });
          /*handleClose();
          console.log(error);*/
        })
        .finally(function () {
          cargarAdmin();
          handleClose();
        });
    }

  }

  const deleteAdmin = (id) => {
    Swal.fire({
      title: '¿Deseas eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#58BEC4',
      cancelButtonColor: '#264B99',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        enviarSolicitud('DELETE', { id: id });
        Swal.fire(
          '¡Eliminado con éxito!',
          'success'
        );
      }
    });
  }

  ///BUSCAR 
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = vetanilla.filter(item =>
    item.nombreVent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.apePaternoVent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.apeMaternoVent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  ////
  const [password, setPassword] = useState('');
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
                  <th colSpan="5" style={{ fontSize: '24px', fontWeight: 'bold' }}>VENTANILLAS</th>
                </tr>
                <tr>
                  {/*<th>ID</th>*/}
                  <th >Nombre</th>
                  <th>Apellido Paterno</th>
                  <th>Apellido Materno</th>
                  <th>Correo electrónico</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>No hay registros</td>
                  </tr>
                ) : (filteredData && filteredData.map((item) => (
                  <tr key={item.id} style={{ border: 'none' }} className='mb-4'>
                    {/*<td className="rounded-border">{item.id}</td>*/}
                    <td className="rounded-border">{item.nombreVent}</td>
                    <td className="rounded-border">{item.apePaternoVent}</td>
                    <td className="rounded-border">{item.apeMaternoVent}</td>
                    <td className="rounded-border">{item.correoElectronico}</td>
                    <td style={{ background: '#2A4172', border: 'none' }}>
                      <button className="btn-b" style={{ marginRight: '5px' }}>
                        <FeatherIcon
                          icon='edit'
                          style={{ color: 'black' }}
                          onClick={() => handleShow('edit', item.id, item.nombreVent, item.apePaternoVent,
                            item.apeMaternoVent, item.correoElectronico, item.passVent, item.status)}
                        />
                      </button>
                      <button className="btn-b" /*style={{ marginRight: '5px' }}*/>
                        <FeatherIcon
                          icon='trash'
                          style={{ color: 'black' }}
                          onClick={() => deleteAdmin(item.id)}
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
          <input type="text" placeholder="Buscar" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <button className="btn-b" onClick={() => handleShow("add")}>Agregar</button>
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
                <Form.Label style={{ color: '#2A4172' }}><b>Nombre(s)</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={nombreVent} onChange={(e) => setNombreVent(e.target.value)}
                //placeholder="First name"
                />
                {/*<Form.Control.Feedback>Completado</Form.Control.Feedback>*/}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Paterno</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={apePaternoVent} onChange={(e) => setApePaternoVent(e.target.value)}
                //placeholder="Last name"
                />

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Materno</b></Form.Label>
                <Form.Control type="text" required
                  value={apeMaternoVent} onChange={(e) => setApeMaternoVent(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label style={{ color: '#2A4172' }}><b>Correo</b></Form.Label>
                <Form.Control type="text" required
                  value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col} md="7" controlId="validationCustom09">
                <Form.Label style={{ color: '#2A4172' }}><b>Contraseña</b></Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} required
                  value={passVent} onChange={(e) => setPassVent(e.target.value)}
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
            <Button variant="outline-success" type='button' onClick={() => validar()}>
              <FeatherIcon icon='check' />&nbsp;Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default VentanillaScreen