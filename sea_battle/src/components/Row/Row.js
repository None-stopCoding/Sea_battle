import React from 'react';
import { Cell } from './../Routing';
import './Row.css';

const Row = ({ rowData }) => {
    return (
        <div id="row">
            {
                rowData.map((cell, index) =>
                    <Cell key={index}
                          value={cell}/>)
            }
        </div>
    )
};

export default Row;