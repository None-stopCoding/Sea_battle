import React, { useState } from 'react';
import { config } from './../../Config';
import { Row } from './../Routing';
import './Field.css';

const Point = (row, cell) => {
    this.x = cell;
    this.y = row;
};

// Размер поля
const size = config.fieldSize;
// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(size)).fill(
    (new Array(size)).fill(0)
);

const random = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

const renderField = (field, status) => {
    Object.entries(status).forEach(([ship, params]) => {
       params.units.forEach(place =>
           place.forEach(point => field[point.y][point.x] = params.size))
    });

    return field;
};

const getAvailableDirections = (field, point, size) => {

};

const createListOfEmptyCells = (field) => {

};

const generateShip = (field, size) => {
    const empty = createListOfEmptyCells(field);

    let directions = [];
    do {
        let point = pickRandomShipPosition(empty);
        directions = getAvailableDirections(field, point, size);
    } while(directions.length);

};

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));
    const [gameStatus, changeGameStatus] = useState(config.ships);
    const [mode, changeMode] = useState('prepare');

    const componentDidMount = () => {
        changeGameStatus(
            Object.fromEntries(
                Object.entries(config.ships).map(([ship, params]) => {
                        let iter = params.amount;
                        params['units'] = [];

                        while (iter--) {
                            params['units'].push(generateShip(field, params.size));
                        }

                        return [ship, params];
                    })
            )
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