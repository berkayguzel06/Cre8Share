import React from 'react';
import '../css/Login.css';
const ResetPassword = () => {
    return(
        <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset Password</title>
            <link rel="stylesheet" href="style.css" />
            <div className="wrapper">
                <form action>
                    <h1>Reset Password</h1>
                    <div className="input-box">
                        <input type="password" placeholder="New Password" required />
                    </div>
                    <button type="submit" className="btn">Set New Password</button>
                    <div className="register-link">
                        <p> <a href="http://localhost:3000/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ResetPassword;