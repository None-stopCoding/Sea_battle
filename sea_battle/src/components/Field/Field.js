import React, { useState } from 'react';
import { config } from './../../Config';
import { Row } from './../Routing';
import './Field.css';

// Размер поля
const size = config.fieldSize;
// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(size)).fill(
    (new Array(size)).fill(1)
);

const renderField = () => {

};

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));
    const [gameStatus, changeGameStatus] = useState(config.ships);

    const componentDidMount = () => {
        changeGameStatus(
            Object.entries(config.ships).map(([ship, params]) => params['pos'] = generateShip(params.))
        );
        setField(renderField(field, gameStatus));
    };

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