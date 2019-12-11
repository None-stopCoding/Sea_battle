import React, { useState } from 'react';
import './Field.css';

// Размер поля
const size = 10;
// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(size)).fill(
    (new Array(size)).fill(0)
);

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));

    return(
        <div id="field">
            1
        </div>
    )
};

export default Field;