import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../css/Login.css';
import {useNavigate} from 'react-router-dom';

const AppLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const loginData = {
            email: email,
            password: password
        };
        // Send a POST request to register the user, and return token.
        await axios.post('http://localhost:5000/user/login',loginData).then((response)=>{
            // If there is an error, alert the user.
            if(response.data.error) {
                alert(response.data.error);
            }else{
                sessionStorage.setItem("accessToken", response.data.token);
                navigate('/home');
            }
        });
    };

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
                        <input 
                        type="text" 
                        placeholder="Email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-box">
                        <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="http://localhost:3000/forgotpassword">Forgot Password</a>
                    </div>
                    <button type="submit" className="btn" onClick={login}>Login</button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="http://localhost:3000/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default AppLogin;