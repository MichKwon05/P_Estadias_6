import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import Logo from '../../assets/Logo.png'
import fondo from '../../assets/fondo - copia.png'
import FeatherIcon from "feather-icons-react";

const Intenso = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div style={{ backgroundImage: `url(${fondo})` }}>
                <section className="ftco-section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={7} lg={5}>
                                <Container className="login-wrap p-4 p-md-5 align-items-center">
                                    <Row className="align-items-center">
                                        <Col md={7} lg={5} className="d-flex justify-content-center"> {/* Utiliza la clase "d-flex" y "justify-content-center" */}
                                            <img src={Logo} alt="Logo" className='logo mb-4' style={{ margin: '0 auto' }} /> {/* Agrega "margin: 0 auto" para centrar la imagen */}
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
                                            <Form.Group >
                                                <Button className="form-control btn btn-primary mb-4"
                                                    style={{ borderRadius: '20px' }}
                                                >Login</Button>
                                            </Form.Group>

                                        </Form>
                                    </Row>
                                    <Row className="text-center">
                                        <Form>
                                            <Form.Group className="d-md-flex">
                                                <div className="w-100 text-align-center">
                                                    <a href="#">¿Olvidaste tu contraseña?</a>
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

            {/*<div className="container">
          <div className="row px-3">
            <div className="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
              <div className="card-body">
                <h4 className="title text-center mt-4">
                  Login into account
                </h4>
                <form className="form-box px-3">
                  <div className="form-input">
                    <span><i className="fa fa-envelope-o"></i></span>
  
                  </div>
                  <div className="form-input">
                    <span><i className="fa fa-key"></i></span>
  
                  </div>
  
                  <div className="mb-3">
                    <div className="custom-control custom-checkbox">
  
                      <label className="custom-control-label" for="cb1">Remember me</label>
                    </div>
                  </div>
  
                  <div className="mb-3">
                    <button type="submit" className="btn btn-block text-uppercase">
                      Login
                    </button>
                  </div>
  
                  <div className="text-right">
                    <a href="#" className="forget-link">
                      Forget Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
    </div>*/}
        </>
    )
}

export default Intenso