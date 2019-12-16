import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import './Cell.css';

const Cell = ({ value, handleClick, mode, playFor }) => {
    const [idName, changeId] = useState('empty');
    const [className, changeClass] = useState('cell');

    useEffect(() => {
        // console.log(value, mode, playFor, (-1) * config.safeValue, !value);
        if (mode === 'play') {
            if (value === (-1) * config.safeValue) changeId('missed');
            else if (value < 0) {
                changeId('killed');
                changeClass('cell');
            }
        }

        if ((mode === 'play' && playFor === 'player') ||
            value === config.safeValue ||
            !value) changeClass('cell empty');
        else changeClass('cell');

        console.log(className);
    });

    return (
        <div className={className}
             onClick={handleClick}>

            <div id={idName}>
                {idName === 'killed' && <img src="./img/fire.png" alt="killed"/>}
            </div>
        </div>
    )
};

export default Cell;