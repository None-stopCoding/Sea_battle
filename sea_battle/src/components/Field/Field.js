import React, { useState, useEffect } from 'react';
import { config } from './../../Config';
import { Row } from './../Routing';
import './Field.css';

/**
 * Двумерный массив (квадрат), заданного размера, заполненный нулями
 * @type {any[]}
 */
const initialField = (new Array(config.fieldSize)).fill(
    (new Array(config.fieldSize)).fill(0)
);

/**
 * Конкструктор объекта точки с координатами
 * @param row
 * @param cell
 * @constructor
 */
function Point(row, cell) {
    this.x = cell;
    this.y = row;
}

/**
 * Отдает случайное число от min до max
 * @param min
 * @param max
 * @returns {number}
 */
const random = (min, max) =>
    Math.round(min - 0.5 + Math.random() * (max - min + 1));

const locateShip = (head, field, size) => {
    let vectors = [1, 2, 3, 4],     // возможные направления: вверх, вправо, вниз, влево
        coords = [head],            // список клеток корабля
        shipCells = [];             // клетки корабля без головной

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

                        while(iter) {
                            shipCells.push(field[head.y - iter--][head.x])
                        }

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

    return coords;
};

// Грубо говоря пробегаемся по каждой клетке корабля и смотрим
// во все 8 условий (4 угла 4 стороны)
/**
 * Грубо говоря пробегаемся по каждой клетке корабля и смотрим
 *  во все 8 условий (4 угла 4 стороны)
 * @param field
 * @param coords
 */
const generateSafeArea = (field, coords) => {
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
};

/**
 * Отдает список разрешшенных клеток (с координатами) для строительства корабля
 * @param field
 * @returns {[]}
 */
const createListOfEmptyCells = (field) =>
    field.flat().map((cell, index) => {
        if (!cell) {
            return new Point(Math.floor(index / 10), index % 10);
        }
    }).filter(cell => cell instanceof Point);

/**
 * Генерируем корабль
 *  - получаем все клетки куда можно поставить корбаль (его первую вершину)
 *  - выбираем из доступных случайную клетку
 *  - для этой клетки выбираем из доступных направление для корабля
 *  - если для выбранной клетки ни в каком из направлений невозможно поставить
 *      корабль, то выбираем другую клетку (случайно)
 * @param field
 * @param size
 * @returns {{renderedField: *, coords: *}}
 */
const generateShip = (field, size) => {
    const empty = createListOfEmptyCells(field);
    let coords = [];

    do {
        // выбираем из списка пустых клеток случаную
        const point = empty[random(0, empty.length - 1)];
        // выбираем направление корабля и получаем его координаты (или коор-ту первой вершины)
        // size - 1 - так как первая вершина уже выбрана
        coords = locateShip(point, field, size - 1);
    } while(coords.length !== size);

    // ставим корабль на поле
    coords.forEach(cell => field[cell.y][cell.x] = size);
    // строим зону "неприкосновенности" вокруг корабля
    generateSafeArea(field, coords);
    return {
        coords: coords,
        renderedField: field
    };
};

const Field = () => {
    const [field, setField] = useState(initialField.map(row => row.slice()));
    const [gameStatus, changeGameStatus] = useState(config.ships);
    const [mode, changeMode] = useState('prepare');

    useEffect(() => {
        let newField = field.map(row => row.slice());
        changeGameStatus(
            Object.fromEntries(
                Object.entries(config.ships)
                    .map(([ship, params]) => {
                        let iter = params.amount;
                        params['units'] = [];
                        while (iter--) {
                            const { coords, renderedField } = generateShip(newField, params.size);

                            params['units'].push(coords);
                            newField = renderedField;
                        }
                        return [ship, params];
                    })
            )
        );
        setField(newField);
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