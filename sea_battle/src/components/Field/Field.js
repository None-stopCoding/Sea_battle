import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import { Row } from './../Routing';
import './Field.css';

// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(config.fieldSize)).fill(
    (new Array(config.fieldSize)).fill(0)
);

function Point(row, cell) {
    this.x = cell;
    this.y = row;
}

const random = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

const renderField = (field, status) => {
    Object.entries(status).forEach(([ _, params ]) => {
       params.units.forEach(place =>
           place.forEach(point => field[point.y][point.x] = params.size))
    });

    return field;
};

const buildShip = (field, head, size) => {
    // возможные направления: вверх, вправо, вниз, влево
    let vectors = [1, 2, 3, 4];
    // список клеток корабля
    let coords = [head];
    // клетки корабля без головной
    let shipCells = [];

    // нет смысла выбирать направление для корабля длиной в одну клетку
    // TODO ИСПРАВИТЬ КОСТЫЛИ НАХРЕН ОТСЮДОВА
    // - двойной else
    // - повтор функционала в case
    // console.log(head);
    if (size) {
        do {
            // switch (vectors[random(0, vectors.length - 1)]) {
            switch (2) {
                case 1:
                    break;
                case 2:
                    // проверка вправо
                    if (head.x + size < config.fieldSize) {
                        shipCells = field[head.y].slice(head.x + 1, head.x + 1 + size);
                        if (shipCells.every(cell => !cell)) {
                            shipCells.forEach((cell, index) =>
                                coords.push(new Point(head.y, head.x + index + 1)))
                        } else {
                            vectors.splice(vectors.indexOf(2), 1);
                        }
                    } else {
                        vectors.splice(vectors.indexOf(2), 1);
                    }
                    break;
                case 3:
                    break;
                case 4:
                    // проверка влево
                    if (head.x - size >= 0) {
                        shipCells = field[head.y].slice(head.x - 1, head.x - 1 - size);
                        if (shipCells.every(cell => !cell)) {
                            shipCells.forEach((cell, index) =>
                                coords.push(new Point(head.y, head.x - index - 1)))
                        }
                    }
                    break;
            }
        } while(coords.length === 1 && vectors.length);
    }

    generateSafeArea(field, coords);

    return coords;
};

// TODO отпимизировать этот долбанный костыль
// Грубо говоря пробегаемся по каждой клетке корабля и смотрим
// во все 8 условий (4 угла 4 стороны)
const generateSafeArea = (field, coords) => {
    const safe = config.safeValue;

    console.log(coords);
    // проврека 3-х нижних и верхних клеток
    const checkTopBottom = (pos, cell) => {
        if (field[pos]) {
            if (!field[pos][cell.x]) {
                field[pos][cell.x] = safe;
            }

            if (field[pos][cell.x + 1] && !field[pos][cell.x + 1]) {
                field[pos[cell.x + 1]] = safe;
            }

            if (field[pos][cell.x - 1] && !field[pos][cell.x - 1]) {
                field[pos[cell.x - 1]] = safe;
            }
        }
    };

    // проверка левой и правой клетки
    const checkLeftRight = (pos, cell) => {
        if (field[cell.y][pos]) {
            if (!field[cell.y][pos]) {
                field[cell.y][pos] = safe;
            }
        }
    };

    coords.forEach(cell => {
        checkTopBottom(cell.y - 1, cell);
        checkTopBottom(cell.y + 1, cell);
        checkLeftRight(cell.x + 1, cell);
        checkLeftRight(cell.x - 1, cell);
    });
};

const createListOfEmptyCells = (field) =>
    field.flat().map((cell, index) => {
        if (!cell) {
            return new Point(Math.floor(index / 10), index % 10);
        }
    }).filter(cell => cell instanceof Point);

const generateShip = (field, size) => {
    const empty = createListOfEmptyCells(field);

    // список координат корабля
    let coords = [];
    // если корабль данной длины невозможно построить в этой точке
    // то пытаемся еще раз
    do {
        // выбираем из списка пустых клеток случаную
        const point = empty[random(0, empty.length - 1)];
        // выбираем направление корабля и сторим его
        coords = buildShip(field, point, size - 1);
    } while(coords.length !== size);

    return coords;
};

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));
    const [gameStatus, changeGameStatus] = useState(config.ships);
    const [mode, changeMode] = useState('prepare');

    useEffect(() => {
        changeGameStatus(
            Object.fromEntries(
                Object.entries(config.ships)
                    .map(([ship, params]) => {
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
    }, []);

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