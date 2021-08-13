import React from 'react';

import classes from './Button.module.css'

export const Button = ({ children, btnType, clicked, type = 'button'}) => (
    <button
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
        type={type}
    >
        {children}
    </button>
)