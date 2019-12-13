import React from 'react';
import './Cell.css';

const Cell = ({ value }) => {
    return (
        <div className={!value || value === 5 ? 'cell empty' : 'cell'}>

        </div>
    )
};

export default Cell;