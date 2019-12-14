import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import { Row } from './../Routing';
import './Field.css';

// Двумерный массив (квадрат), заданного размера, заполненный нулями
const initialField = (new Array(config.fieldSize)).fill(
    (new Array(config.fieldSize)).fill(0)
);

const [field, setField] = useState(initialField.map(row => row.slice()));

function Point(row, cell) {
    this.x = cell;
    this.y = row;
}

const random = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

const buildShip = (head, size) => {
    // возможные направления: вверх, вправо, вниз, влево
    let vectors = [1, 2, 3, 4];
    // список клеток корабля
    let coords = [head];
    // клетки корабля без головной
    let shipCells = [];

    debugger;
    // нет смысла выбирать направление для корабля длиной в одну клетку
    // TODO ВЫПИЛИТЬ КОСТЫЛИ НАХРЕН ОТСЮДОВА
    // - двойной else
    // - повтор функционала в case
    if (size) {
        do {
            switch (vectors[random(0, vectors.length - 1)]) {
                case 1:
                    // проверка вверх
                    if (head.y - size >= 0) {
                        let iter = size;
                        shipCells = [];

                        while(iter--) {
                            shipCells.push(field[head.y - iter][head.x])
                        }
                        console.log(1, head, size, shipCells);
                        if (shipCells.every(cell => !cell)) {
                            shipCells.forEach((cell, index) =>
                                coords.push(new Point(head.y - index - 1, head.x)))
                        } else {
                            vectors.splice(vectors.indexOf(1), 1);
                        }
                    } else {
                        vectors.splice(vectors.indexOf(1), 1);
                    }
                    break;
                case 2:
                    // проверка вправо
                    if (head.x + size < config.fieldSize) {
                        shipCells = field[head.y].slice(head.x + 1, head.x + 1 + size);
                        console.log(2, head, size, shipCells);
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
                    // проверка вниз
                    if (head.y + size < config.fieldSize) {
                        let iter = 0;
                        shipCells = [];

                        while(++iter <= size) {
                            shipCells.push(field[head.y + iter][head.x])
                        }
                        console.log(3, head, size, shipCells);
                        if (shipCells.every(cell => !cell)) {
                            shipCells.forEach((cell, index) =>
                                coords.push(new Point(head.y + index + 1, head.x)))
                        } else {
                            vectors.splice(vectors.indexOf(3), 1);
                        }
                    } else {
                        vectors.splice(vectors.indexOf(3), 1);
                    }
                    break;
                case 4:
                    // проверка влево
                    if (head.x - size >= 0) {
                        shipCells = field[head.y].slice(head.x - size, head.x);
                        console.log(4, head, size, shipCells);
                        if (shipCells.every(cell => !cell)) {
                            shipCells.forEach((cell, index) =>
                                coords.push(new Point(head.y, head.x - index - 1)))
                        } else {
                            vectors.splice(vectors.indexOf(4), 1);
                        }
                    } else {
                        vectors.splice(vectors.indexOf(4), 1);
                    }
                    break;
                default:
                    break;
            }
        } while(coords.length === 1 && vectors.length);
    }

    // debugger;
    // ставим корабль на поле (size конечно с головой)
    coords.forEach(cell => field[cell.y][cell.x] = size + 1);
    // строим зону "неприкосновенности" вокруг корабля
    generateSafeArea(coords);

    // вызываем callback
    setField(field);
    return coords;
};

// Грубо говоря пробегаемся по каждой клетке корабля и смотрим
// во все 8 условий (4 угла 4 стороны)
const generateSafeArea = (coords) => {
    const safe = config.safeValue,
        size = config.fieldSize,
        sides = [-1, 0, 1];

    coords.forEach(point => {
        sides.forEach(rowOffset => {
            const row = point.y + rowOffset;
            sides.forEach(cellOffset => {
                const cell = point.x + cellOffset;
                if (0 <= row && row < size &&
                    0 <= cell && cell < size &&
                    !field[row][cell]) {

                    field[row][cell] = safe;
                }
            });
        });
    });
    console.log(field);
};

const createListOfEmptyCells = () =>
    field.flat().map((cell, index) => {
        if (!cell) {
            return new Point(Math.floor(index / 10), index % 10);
        }
    }).filter(cell => cell instanceof Point);

const generateShip = (size) => {
    const empty = createListOfEmptyCells();
    // список координат корабля
    let coords = [];
    // если корабль данной длины невозможно построить в этой точке
    // то пытаемся еще раз
    do {
        // debugger;
        // выбираем из списка пустых клеток случаную
        const point = empty[random(0, empty.length - 1)];
        // выбираем направление корабля и сторим его
        coords = buildShip(point, size - 1);
    } while(coords.length !== size);

    return coords;
};

const Field = () => {
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
                            params['units'].push(generateShip(params.size));
                        }
                        return [ship, params];
                    })
            )
        );
        console.log(gameStatus);
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