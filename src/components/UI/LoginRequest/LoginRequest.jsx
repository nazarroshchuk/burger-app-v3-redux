import React from 'react';
import { Container } from '../Container/Container';
import { Link } from "react-router-dom";
import classes from './LoginRequest.module.css';

export const LoginRequest = () => {
    return (
        <Container>
            <div className={classes.loginRequest}>
                <p>Hello, You can create your own delicious after <Link to={'/log-in'}>LogIN</Link></p>
                <p>
                    For testing this app you can use dummy account:
                    <ul>
                        <li>Login: test@test.com</li>
                        <li>Password: test@burger</li>
                    </ul>
                </p>
            </div>
        </Container>
    )
}
