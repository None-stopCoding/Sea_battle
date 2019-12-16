import React from 'react';
import { Cell } from './../Routing';
import './Row.css';

const Row = ({ rowData, mode, playFor, rowIndex, handleClick }) => {
    return (
        <div id="row">
            {
                rowData.map((cell, index) =>
                    <Cell key={index}
                          value={cell}
                          handleClick={() => handleClick(rowIndex, index)}
                          mode={mode}
                          playFor={playFor}/>)
            }
        </div>
    )
};

export default Row;