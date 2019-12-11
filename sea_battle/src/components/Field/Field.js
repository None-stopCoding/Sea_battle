import React, { useState } from 'react';
import { Row, config } from './../Routing';
import './Field.css';
// Размер поля
const size = 10;
// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(size)).fill(
    (new Array(size)).fill(1)
);

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));

    return(
        <div id="field">
            {
                field.map((row, index) =>
                    <Row key={index}
                         rowData={row}/>)
            }
        </div>
    )
};

export default Field;