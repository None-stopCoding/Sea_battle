import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import './Cell.css';

/**
 * @param value
 * @param handleClick
 * @param mode
 * @param playFor
 * @returns {*}
 * @constructor
 */
const Cell = ({ value, handleClick, mode, playFor }) => {
    const [idName, changeId] = useState('empty');

    useEffect(() => {
        if (value === (-1) * config.safeValue) {
            changeId('missed');
        }
        else if (value < 0) {
            changeId('killed');
        }
    });

    const getClassName = () => {
        let className = 'cell';
        if ((mode === 'play' && playFor === 'AI') ||
            (mode === 'prepare' && playFor === 'player')) {

            if (!value || Math.abs(value) === config.safeValue) {
                className += ' empty';
            }
        } else {
            if (idName !== 'killed') {
                className += ' empty';
            }
        }
        return className;
    };

    return (
        <div className={getClassName()}
             onClick={handleClick}>

            <div id={idName}>
                {idName === 'killed' && <img src="./img/fire.png" alt="killed"/>}
            </div>
        </div>
    )
};

export default Cell;