import React from 'react'
import {Form, Container, Row, Col, Button} from 'react-bootstrap';
import Logo from '../../assets/Logo.jpeg'

const Login = () => {
  return (
    <>
      <section className="ftco-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={7} lg={5}>
              <Container className="login-wrap p-4 p-md-5">
                <img src={Logo} alt="Logo" className='logo' />
                <h3 className="text-center mb-5">CITAT</h3>
                <Form className="login-form">
                    <Form.Group className="mb-4" controlId="email">

                      <Form.Control type="email" placeholder="Correo electrónico" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Control type="email" placeholder="Contraseña" />
                    </Form.Group>

                  <Form.Group >
                    <Button className="form-control btn btn-primary mb-4">Login</Button>
                  </Form.Group>
                  <Form.Group className="d-md-flex">
                    <div className="w-100">
                      <a href="#">¿Olvidaste tu contraseña?</a>
                    </div>
                  </Form.Group>
                </Form>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
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

export default Login
