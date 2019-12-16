import React, { useState, useEffect } from 'react';
import { Cell } from './../Routing';
import './Field.css';

const Field = ({ field, mode, playFor, handleClick }) => {
    return(
        <div id="field">
            {
                field.map((row, rowIndex) =>
                    <div id="row" key={rowIndex}>
                        {
                            row.map((cell, index) =>
                                <Cell key={index}
                                      value={cell}
                                      handleClick={() => handleClick(rowIndex, index, playFor)}
                                      mode={mode}
                                      playFor={playFor}/>)
                        }
                    </div>
                )
            }
        </div>
    )
};

export default Field;