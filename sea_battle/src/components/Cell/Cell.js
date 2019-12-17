import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import './Cell.css';

/**
 * TODO Оптимизировать это зло
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
        if (mode === 'play') {
            if (value === (-1) * config.safeValue) {
                changeId('missed');
            }
            else if (value < 0) {
                changeId('killed');
            }
        }
    });

    const getClassName = () => {
        if (mode === 'play') {
            if (playFor === 'player') {
                if (idName === 'killed') {
                    return 'cell';
                }
                return 'cell empty';
            } else {
                if (!value || value === config.safeValue || value === (-1) * config.safeValue) {
                    return 'cell empty';
                }
                return 'cell';
            }
        } else {
            if (value && value !== config.safeValue) return 'cell';

            return 'cell empty';
        }
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