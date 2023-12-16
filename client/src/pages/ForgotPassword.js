import React from 'react';
import '../css/Login.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
const ForgotPassword = () => {
    const onSubmit = (data) => {
        axios.post("http://localhost:3000/ForgotPassword", data).then((response) => {
          console.log("IT WORKED");
        })};
    return(
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Log In</title>
            <link rel="stylesheet" href="style.css" />
            <div className="wrapper">
                <form action>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                    </div>
                    <button type="submit" className="btn">Login</button>


                </form>
            </div>
        </div>
    );
}
export default ForgotPassword;