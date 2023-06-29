import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Modal, Card, Col, Row, Badge, Button, Form, InputGroup } from 'react-bootstrap'
import DataTable, { createTheme } from 'react-data-table-component'
import '../../../shared/plugins/Screens.css'

import FeatherIcon from 'feather-icons-react/build/FeatherIcon'
import Swal from 'sweetalert2';

const AdminScreen = () => {
    const navigate = useNavigate();

    const url = `http://localhost:8080/api/administrador/`

    /*Cargar Administradores */
    const [admin, setAdmin] = useState([]);
    const [id, setId] = useState('');
    const [nombreAdmin, setNombreAdmin] = useState('');
    const [apeMaternoAdmin, setApellidoMaterno] = useState('');
    const [apePaternoAdmin, setApellidoPaterno] = useState('');
    const [correoAdmin, setCorreo] = useState('');
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        cargarAdmin();
    }, []);

    const cargarAdmin = async () => {
        try {
            const respuesta = await axios.get(url);
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

    const handleShow = (mode, id, nombreAdmin, apePaternoAdmin, apeMaternoAdmin,
        correoAdmin, pass, status) => {
        setId('');
        setNombreAdmin('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setCorreo('');
        setPass('');
        setStatus(true);
        setMode(mode);
        if (mode === "add") {
            setTitle('Registrar administrador');
        } else if (mode === "edit") {
            setTitle('Editar administrador');
            setId(id);
            setNombreAdmin(nombreAdmin);
            setApellidoPaterno(apePaternoAdmin);
            setApellidoMaterno(apeMaternoAdmin);
            setCorreo(correoAdmin);
            setPass(pass);
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
        if (![nombreAdmin, apePaternoAdmin, /*apeMaternoAdmin,*/ correoAdmin, pass].every(field => field !== '')) {
            Swal.fire({
                icon: 'warning',
                title: 'Llena todos los campos',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            if (modo === "add") {
                parametros = {
                    nombreAdmin: nombreAdmin.trim(), apePaternoAdmin: apePaternoAdmin.trim(), apeMaternoAdmin: apeMaternoAdmin,
                    correoAdmin: correoAdmin.trim(), pass: pass.trim(), status: status
                };
                metodo = 'POST';
            } else {
                parametros = {
                    id: id, nombreAdmin: nombreAdmin.trim(), apePaternoAdmin: apePaternoAdmin.trim(), apeMaternoAdmin: apeMaternoAdmin,
                    correoAdmin: correoAdmin.trim(), pass: pass.trim(), status: status
                };
                metodo = 'PUT';
            }
            enviarSolicitud(metodo, parametros);
        }
    }

    const enviarSolicitud = async (metodo, parametros) => {
        if (metodo === 'PUT') {
            await axios({ method: metodo, url: `http://localhost:8080/api/administrador/${id}`, data: parametros })
                .then(function (respuesta) {
                    var hasError = respuesta.data.status;
                    var msj = respuesta.data.message;
                    Swal.fire({
                        icon: 'success',
                        iconColor: '#58BEC4',
                        title: 'Administrador actualizado correctamente',
                        text: 'Administrador: ' + nombreAdmin + ' ' + apePaternoAdmin,
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
                    cargarAdmin();
                    handleClose();
                });
        } else if (metodo === 'DELETE') {
            await axios({ method: metodo, url: `http://localhost:8080/api/administrador/${parametros.id}` })
                .then(function (respuesta) {
                    var hasError = respuesta.data.status;
                    var msj = respuesta.data.message;
                    Swal.fire({
                        icon: 'success',
                        iconColor: '#58BEC4',
                        title: 'Administrador eliminado correctamente',
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
                    handleClose();
                    console.log(error);
                })
                .finally(function () {
                    cargarAdmin();
                    handleClose();
                });
        } else {
            await axios({ method: metodo, url: url, data: parametros })
                .then(function (respuesta) {

                    var hasError = respuesta.data.status;
                    var msj = respuesta.data.message;
                    Swal.fire({
                        icon: 'success',
                        iconColor: '#58BEC4',
                        title: 'Administrador registrado corrrectamente',
                        text: 'Administrador: ' + nombreAdmin + ' ' + apePaternoAdmin,
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
    const filteredData = admin.filter(item =>
        item.nombreAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apePaternoAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.apeMaternoAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.correoAdmin.toLowerCase().includes(searchTerm.toLowerCase())
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
                                    {/*<th>ID</th>*/}
                                    <th >Nombre</th>
                                    <th>Apellido Materno</th>
                                    <th>Apellido Paterno</th>
                                    <th>Correo electrónico</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData && filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" style={{ textAlign: 'center' }}>No hay registros</td>
                                    </tr>
                                ) : (
                                    filteredData && filteredData.map((item) => (
                                        <tr key={item.id} style={{ border: 'none' }} className='mb-4'>
                                            {/*<td className="rounded-border">{item.id}</td>*/}
                                            <td className="rounded-border">{item.nombreAdmin}</td>
                                            <td className="rounded-border">{item.apePaternoAdmin}</td>
                                            <td className="rounded-border">{item.apeMaternoAdmin}</td>
                                            <td className="rounded-border">{item.correoAdmin}</td>
                                            <td style={{ background: '#2A4172', border: 'none' }}>

                                                <button className="btn-b" style={{ marginRight: '5px' }}>
                                                    <FeatherIcon
                                                        icon='edit'
                                                        style={{ color: 'black' }}
                                                        onClick={() => handleShow('edit', item.id, item.nombreAdmin, item.apePaternoAdmin,
                                                            item.apeMaternoAdmin, item.correoAdmin, item.pass, item.status)}
                                                    />
                                                </button>
                                                <button className="btn-b" /*style={{ marginRight: '5px' }}*/>
                                                    <FeatherIcon
                                                        icon='trash'
                                                        style={{ color: 'black' }}
                                                        onClick={() => deleteAdmin(item.id)}
                                                    />
                                                </button>
                                                {/*<button className="btn-b">
                                                    <FeatherIcon
                                                        icon='edit'
                                                        style={{ color: 'black' }}
                                                        onClick={() => handleShow('edit', item.id, item.nombreAdmin, item.apePaternoAdmin,
                                                            item.apeMaternoAdmin, item.correoAdmin, item.pass, item.status)}
                                                    />
                                    </button>*/}
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
                                    value={nombreAdmin} onChange={(e) => setNombreAdmin(e.target.value)}
                                //placeholder="First name"
                                />
                                {/*<Form.Control.Feedback>Completado</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Paterno</b></Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={apePaternoAdmin} onChange={(e) => setApellidoPaterno(e.target.value)}
                                //placeholder="Last name"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label style={{ color: '#2A4172' }}><b>Apellido Materno</b></Form.Label>
                                <Form.Control type="text" required
                                    value={apeMaternoAdmin} onChange={(e) => setApellidoMaterno(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom04">
                                <Form.Label style={{ color: '#2A4172' }}><b>Correo</b></Form.Label>
                                <Form.Control type="text" required
                                    value={correoAdmin} onChange={(e) => setCorreo(e.target.value)} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group as={Col} md="7" controlId="validationCustom09">
                                <Form.Label style={{ color: '#2A4172' }}><b>Contraseña</b></Form.Label>
                                <Form.Control type={showPassword ? "text" : "password"} required
                                    value={pass} onChange={(e) => setPass(e.target.value)}
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

export default AdminScreen