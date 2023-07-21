import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import fondo from "../../assets/Fondo.jpeg";
import Logo from "../../assets/Logo.png";
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  ///
  const baseUrl = `http://localhost:8080/api/`
  const navigate = useNavigate();

  const [admin, setAdmin] = useState([]);
  const [solicitante, setSolicitante] = useState([]);
  const [ventanilla, setVentanilla] = useState([]);
  const [userData, setUserData] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let found = false;

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = () => {
    if (localStorage.getItem('sesionId')) {
      switch (localStorage.getItem('rol')) {
        case 'admin':
          navigate('/adminDashboard')
          break;
        case 'ventanilla':
          navigate('/ventanillaDashBoard')
          break;
        default:
          break;
      }
    }
  }

  const buscarPersona = async () => {
    let found = false; // Agregamos la declaración de la variable found y la inicializamos en false.
  
    if (validate()) {
      let usuario = null;
      let rol = '';
  
      fetch(`${baseUrl}administrador/`).then((resp) => {
        return resp.json();
      }).then((resp) => {
  
        for (let index = 0; index < resp.obj.length; index++) {
          const element = resp.obj[index];
          if (element.correo === email && element.password === password) {
            usuario = element;
            rol = 'admin'
            found = true;
          }
        }
  
        fetch(`${baseUrl}ventanillas/`).then((resp) => {
          return resp.json();
        }).then((resp) => {
          for (let index = 0; index < resp.obj.length; index++) {
            const element = resp.obj[index];
            if (element.correo === email && element.password === password) {
              usuario = element;
              rol = 'ventanilla'
              found = true;
            }
          }
  
          if (usuario === null) {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            localStorage.setItem("rol", rol)
            localStorage.setItem("correo", usuario.correo)
            localStorage.setItem("sesionId", usuario.id)
            let dato = localStorage.getItem("sesionUser")
  
            switch (rol) {
              case 'admin':
                navigate('/adminDashboard')
                break;
              case 'ventanilla':
                navigate('/ventanillaDashBoard')
                break;
              default:
                break;
            }
          }
        })
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
  


  const validate = () => {
    let result = true;
    if (email === ' ' || email === null || email === '') {
      result = false;
    }
    if (password === ' ' || password === null || password === '') {
      result = false;
    }
    return result;
  }
  return (
    <Container fluid style={{
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <Form className="form_container">
        {/* Logo and title_container are unchanged */}
        <Col md={7} lg={5} className="mx-auto"> {/* Utiliza la clase "mx-auto" para centrar horizontalmente */}
          <div style={{ textAlign: 'center' }}> {/* Agrega "textAlign: 'center'" para centrar horizontalmente el contenido */}
            <img src={Logo} alt="Logo" className="logo mb-4" style={{ margin: '0 auto' }} /> {/* Aplica "margin: 0 auto" para centrar la imagen */}
          </div>
        </Col>
        {/* ... */}
        <div className="input_container">
          <FeatherIcon
            icon="mail"
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
          />
          <input
            placeholder="Correo Institucional"
            title="Input title"
            name="input-name"
            type="text"
            className="input_field"
            id="email_field"
            style={{ paddingLeft: '40px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_container">
          <FeatherIcon
            icon={showPassword ? 'eye-off' : 'eye'}
            className="icon"
            onClick={handlePasswordVisibility}
          />
          <input
            placeholder="******"
            title="Input title"
            name="input-name"
            type={showPassword ? 'text' : 'password'}
            style={{ paddingLeft: '40px' }}
            className="input_field"
            id="password_field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>

        {/* Sign In Button */}
        <button title="Sign In" type="submit" className="sign-in_btn"
          onClick={buscarPersona}>
          <span>Iniciar Sesión</span>
        </button>

        <a href="#" className="mb-4" style={{ color: '#264B99' }}>¿Olvidaste tu contraseña?</a>
      </Form>
    </Container>
  )
}

export default Login;
