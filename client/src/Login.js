import React from 'react';
import './Login.css';
const AppLogin = () => {
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
                        <input type="password" placeholder="Password" required />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AppLogin;