import React, { useState, useEffect } from "react";
import axiosLogin from "../components/axios/axiosLogin";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Form, Row } from "react-bootstrap";
import history from "../components/history/history";
import basestyle from '../style.css'
import Background from '../images/bg-sign-up-cover.jpeg';
const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    sessionStorage.clear();
}, []);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  
  

  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };


  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };



  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axiosLogin.post("users/login", user).then((res) => {
        sessionStorage.setItem("EMAIL", user.email); 
        sessionStorage.setItem("NAME", res.data.fullName);
        sessionStorage.setItem("ROLE", res.data.role); 
        sessionStorage.setItem("TOKEN", res.data.token); 
        history.push("/home");
        window.location.reload();
      });
     
    }
  });




  return (

  <div className='full-screen bg-sign-in' style={{backgroundImage: `url(${Background})`}}>
    <div className='main-container' align="center">
      <Row className="mt-5" style={{ paddingTop: '150px' }} >
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-sm" style={{ backgroundColor: 'white', borderRadius: '20px', maxWidth: '500px' }}>
          <h2 className="Auth-form-title" style={{ textAlign: "left", textFont: "Arial" }} >Sign in</h2>
          <br></br>
          <Form>
            <Form.Group controlId="email" onChange={changeHandler}>
              <Form.Control type="email" className=" " placeholder=" &#128100; Email" name="email" />
            </Form.Group>
            <p style={{ color: 'red' }} className={basestyle.error}>{formErrors.email}</p>
            <Form.Group controlId="password" onChange={changeHandler}>
              <Form.Control type="password" placeholder="&#x1f511; Password" name="password" />
            </Form.Group>
            <p style={{ color: 'red' }} className={basestyle.error}>{formErrors.password}</p>
            <div className="d-flex justify-content-center">
              <button style={{ fontSize: 20, width: 225, color: "" }} className="btn btn-primary waves-effect" type="submit" onClick={loginHandler}>Login </button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  </div>

  );
};
export default Login;

