import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import fondo from "../../assets/Fondo.jpeg";
import Logo from "../../assets/Logo.png";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [buttonColor, setButtonColor] = useState('primary'); // Estado inicial del color del botón

  const handleClick = () => {
    setButtonColor('secondary'); // Cambiar el color del botón al hacer clic
  };


  return (
    <div style={{ 
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
    }}>
      <section className="vh-100 ftco-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={7} lg={5}>
              <Container className="login-wrap p-4 p-md-5 align-items-center">
                <Row className="align-items-center">
                  <Col md={7} lg={5} className="mx-auto"> {/* Utiliza la clase "mx-auto" para centrar horizontalmente */}
                    <div style={{ textAlign: 'center' }}> {/* Agrega "textAlign: 'center'" para centrar horizontalmente el contenido */}
                      <img src={Logo} alt="Logo" className="logo mb-4" style={{ margin: '0 auto' }} /> {/* Aplica "margin: 0 auto" para centrar la imagen */}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Form className="login-form">
                    <InputGroup className="mb-4" >
                      <Form.Control
                        type="text"
                        /*onChange={(e) => setEmail(e.target.value)}*/
                        placeholder="Correo institucional"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        style={{ borderRadius: '20px' }}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="*********"
                        id="password"
                        autoComplete="off"
                        name="password"
                        style={{ borderRadius: '20px' }}
                      /*value={password}
                      onChange={(e) => setPassword(e.target.value)}*/
                      />
                      <Button className="btn border border-1" style={{ backgroundColor: "white", borderLeft: "none", borderRadius: '20px' }} onClick={togglePassword}>
                        <FeatherIcon style={{ stroke: 'gray' }} icon={showPassword ? 'eye-off' : 'eye'} />
                      </Button>
                    </InputGroup>
                    <Button 
                    className="form-control btn btn-primary mb-4"
                      style={{ borderRadius: '20px' ,  background: '#264B99' }}
                    >
                      Iniciar Sesión
                    </Button>
                  </Form>
                </Row>
                <Row className="text-center">
                  <Form>
                    <Form.Group className="d-md-flex">
                      <div className="w-100 text-align-center">
                        <a href="#" style={{color: '#264B99'}}>¿Olvidaste tu contraseña?</a>
                      </div>
                    </Form.Group>
                  </Form>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    </div>

  )
}

export default Login
