import React, { useState, useEffect } from 'react';
import { Cell } from './../Routing';
import './Field.css';
import {config} from "../../Config";

/**
 * TODO подумать над оптимизацией
 * @param field
 * @param mode
 * @param playFor
 * @param handleClick
 * @returns {*}
 * @constructor
 */
const Field = ({ field, mode, playFor, handleClick }) => {

    const getClassAndId = (value) => {
        let className = 'cell',
            idName = 'empty';

        if (parseInt(value) === (-1) * config.safeValue) {
            idName = 'missed';
        }
        else if (parseInt(value) < 0) {
            idName = 'killed';
        }

        if (typeof value === 'string') {
            className += ' safe';
        } else {
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
        }

        return {
            idName: idName,
            className: className
        };
    };

    return(
        <div id="field">
            {
                field.map((row, rowIndex) =>
                    <div id="row" key={rowIndex}>
                        {
                            row.map((cell, index) => {
                                const { idName, className } = getClassAndId(cell);
                                return (
                                    <div className={className}
                                         onClick={() => handleClick(rowIndex, index, playFor)}
                                         key={index}>

                                        <div id={idName}>
                                            {idName === 'killed' && <img src="./img/fire.png" alt="killed"/>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
};

export default Field;