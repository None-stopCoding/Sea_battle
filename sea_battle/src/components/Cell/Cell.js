import React, { useState } from 'react';
import './Cell.css';

const Cell = ({ value }) => {
    return (
        <div id={value ? 'cell' : 'cell_empty'}>

        </div>
    )
};

export default Cell;