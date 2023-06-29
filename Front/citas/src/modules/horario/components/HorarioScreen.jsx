import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Card, Col, Row, Badge, Button, Form, InputGroup } from 'react-bootstrap'
import DataTable, { createTheme } from 'react-data-table-component'
import '../../../shared/plugins/Screens.css'
import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import Swal from 'sweetalert2';

const HorarioScreen = () => {

  const navigate = useNavigate();
  const urlHorario = `http://localhost:8080/api/horarios-ventanilla/`

  /*Cargar Ventanilla */
  const [horario, setHorario] = useState([]);
  const [ventanilla, setVentanilla] = useState([]);

  const [id, setId] = useState('');
  const [diaSemana, setDia] = useState('');
  const [horarioInicio, setInicio] = useState('');
  const [horarioFin, setFin] = useState('');
  const [cantidadRepeticiones, setRepeticion] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    cargarHorarios();
    cargarVentanilla();
  }, []);

  const cargarHorarios = async () => {
    try {
      const respuesta = await axios.get(urlHorario);
      setHorario(respuesta.data);
      console.log(respuesta.data)
      //console.clear();
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const cargarVentanilla = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:8080/api/ventanilla/`);
      setVentanilla(respuesta.data);
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

  const handleShow = (mode, id, diaSemana, horarioInicio, horarioFin,
    cantidadRepeticiones, status) => {
    setId('');
    setDia('');
    setInicio('');
    setFin('');
    setRepeticion('');
    setStatus(status);
    setMode(mode);
    if (mode === "add") {
      setTitle('Registrar horario');
    } else if (mode === "edit") {
      setTitle('Editar horario');
      setId(id);
      setDia(diaSemana);
      setInicio(horarioInicio);
      setFin(horarioFin);
      setRepeticion(cantidadRepeticiones);
      setStatus(status);
      setMode(mode);
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
    if (![diaSemana, horarioInicio, horarioFin, cantidadRepeticiones].every(field => field !== '')) {
      Swal.fire({
        icon: 'warning',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (modo === "add") {
        parametros = {
          diaSemana: diaSemana.trim(),
          horarioInicio: horarioInicio,
          horarioFin: horarioFin,
          cantidadRepeticiones: cantidadRepeticiones,
          status: status
        };
        metodo = 'POST';
      } else {
        parametros = {
          diaSemana: diaSemana.trim(),
          horarioInicio: horarioInicio,
          horarioFin: horarioFin,
          cantidadRepeticiones: cantidadRepeticiones,
          status: status
        };
        metodo = 'PUT';
      }
      enviarSolicitud(metodo, parametros);
    }
  }

  const enviarSolicitud = async (metodo, parametros) => {
    if (metodo === 'PUT') {
      await axios({ method: metodo, url: `http://localhost:8080/api/horarios-ventanilla/${id}`, data: parametros })
        .then(function (respuesta) {
          var hasError = respuesta.data.status;
          ///var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Horario actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarHorarios();
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
          cargarHorarios();
          handleClose();
        });

    } else if (metodo === 'DELETE') {
      await axios({ method: metodo, url: `http://localhost:8080/api/horarios-ventanilla/${parametros.id}` })
        .then(function (respuesta) {
          var hasError = respuesta.data.status;
          var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Horario eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarHorarios();
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
          console.log(error);
        })
        .finally(function () {
          cargarHorarios();
          handleClose();
        });
    } else {
      await axios({ method: metodo, url: urlHorario, data: parametros })
        .then(function (respuesta) {

          var hasError = respuesta.data.status;
          var msj = respuesta.data.message;
          Swal.fire({
            icon: 'success',
            iconColor: '#58BEC4',
            title: 'Horario registrado corrrectamente',
            showConfirmButton: false,
            timer: 1500
          });
          if (hasError === false) {
            cargarHorarios();
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
          cargarHorarios();
          handleClose();
        });
    }

  }

  const deleteHorario = (id) => {
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
  const filteredData = horario.filter(item =>
    item.diaSemana.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.horarioInicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.horarioFin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cantidadRepeticiones.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <th colSpan="5" style={{ fontSize: '24px', fontWeight: 'bold' }}>HORARIOS</th>
                </tr>
                <tr>
                  {/*<th>ID</th>*/}
                  <th>Día de la semana </th>
                  <th>Hora de Inicio</th>
                  <th>Hora de Fin</th>
                  <th>Cantidad de repeticiones</th>
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
                    <td className="rounded-border">{item.diaSemana}</td>
                    <td className="rounded-border">{item.horarioInicio}</td>
                    <td className="rounded-border">{item.horarioFin}</td>
                    <td className="rounded-border">{item.cantidadRepeticiones}</td>
                    <td style={{ background: '#2A4172', border: 'none' }}>
                      <button className="btn-b" style={{ marginRight: '5px' }}>
                        <FeatherIcon
                          icon='edit'
                          style={{ color: 'black' }}
                          onClick={() => handleShow('edit', item.id, item.diaSemana, item.horarioInicio, item.horarioFin,
                            item.cantidadRepeticiones, item.status)}
                        />
                      </button>
                      <button className="btn-b" /*style={{ marginRight: '5px' }}*/>
                        <FeatherIcon
                          icon='trash'
                          style={{ color: 'black' }}
                          onClick={() => deleteHorario(item.id)}
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
                <Form.Label style={{ color: '#2A4172' }}><b>Día de la semana</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={diaSemana} onChange={(e) => setDia(e.target.value)}
                />
                {/*<Form.Control.Feedback>Completado</Form.Control.Feedback>*/}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label style={{ color: '#2A4172' }}><b>Hora de Inicio</b></Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={horarioInicio} onChange={(e) => setInicio(e.target.value)}
                //placeholder="Last name"
                />

              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label style={{ color: '#2A4172' }}><b>Horario de Fin</b></Form.Label>
                <Form.Control type="text" required
                  value={horarioFin} onChange={(e) => setFin(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label style={{ color: '#2A4172' }}><b>Cantidad de repeticiones</b></Form.Label>
                <Form.Control type="text" required
                  value={cantidadRepeticiones} onChange={(e) => setRepeticion(e.target.value)} />
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


export default HorarioScreen