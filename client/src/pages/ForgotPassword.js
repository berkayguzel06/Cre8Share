import React from 'react';
import '../css/Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useState, useEffect } from 'react';

const ForgotPassword = () => {
    const onSubmit = (values) => {
        // Now, values.email and values.username contain the input values
        axios.post('http://localhost:5000/forgotpassword', values)
          .then(response => {
            console.log(response.data);
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
              {/* Use Field component for email input */}
              <Field type="text" name="email" placeholder="Email" required />
            </div>
            <div className="input-box">
              {/* Use Field component for username input */}
              <Field type="text" name="username" placeholder="Username" required />
            </div>
            <button type="submit" className="btn">
              Send Email
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;