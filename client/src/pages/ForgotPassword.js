import React from 'react';
import '../css/Login.css';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useState } from 'react';

const ForgotPassword = () => {
  const [state, setState] = useState('');
  const onSubmit = (values) => {
      // Now, values.email and values.username contain the input values
      axios.post('http://localhost:5000/forgotpassword', values)
        .then(response => {
          console.log("message: ",response.data.message);
          setState(response.data.message);
          console.log("state: ",state);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    };

    return (
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Forgot Password</title>
        <link rel="stylesheet" href="style.css" />
        <div className="wrapper">
          <Formik initialValues={{ email: '', username: '' }} onSubmit={onSubmit}>
            <Form>
              <h1>Forgot Password</h1>
              <div className="input-box">
                <Field type="text" name="email" placeholder="Email" required />
              </div>
              <div className="input-box">
                <Field type="text" name="username" placeholder="Username" required />
              </div>
              <button type="submit" className="btn">
                Send Email
              </button>
              {state && <p>{state}</p>}
              <div className="register-link">
                <p>You already have an account? <a href="http://localhost:3000/login">Login</a></p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    );
  };

export default ForgotPassword;