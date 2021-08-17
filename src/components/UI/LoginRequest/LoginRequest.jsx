import React from 'react';
import { Link } from "react-router-dom";
import classes from './LoginRequest.module.css';

export const LoginRequest = () => {
    return (

            <div className={classes.loginRequest}>
                <p>Hello, You can create your own delicious <span>Burger</span> after <Link to={'/log-in'}>LogIN</Link></p>
                <p>
                    For testing this app you can use dummy account:
                    <ul>
                        <li>Login: <span>test@test.com</span></li>
                        <li>Password: <span>test@burger</span></li>
                    </ul>
                </p>
            </div>

    )
}
