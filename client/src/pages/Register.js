import React from 'react';
import '../css/Login.css';
const Register = () => {
    return(
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Log In</title>
            <link rel="stylesheet" href="style.css" />
            <div className="wrapper">
                <form action>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="First Name" required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Last Name" required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Email" required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <div className="register-link">
                        <p>You already have an account? <a href="http://localhost:3000/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;