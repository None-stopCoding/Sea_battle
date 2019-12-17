import {config} from "../Config";
import _ from "underscore";

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
 * По созданным конфигам (directions) для каждого направления
 *  выбираем случайное и пытаемся посторить корабль
 *  если не выходит вычеркиваем его из списка доступных напрвлений
 * Как только все направления были перебраны и корабль не удалось построить
 *  выозвращаем coords с одной точкой - вершина начала корабля - сигнал неудачи для кораблей длиннее лодки
 * @param head
 * @param field
 * @param size
 * @returns {[*]}
 */
const locateShip = (head, field, size) => {
    let coords = [head];            // список координат клеток корабля

    const directions = [
        { 'futureShip': head.y - size, 'offset': { 'y': -1, 'x': 0 } },     // вверх
        { 'futureShip': head.x + size, 'offset': { 'y': 0, 'x': 1 } },      // вправо
        { 'futureShip': head.y + size, 'offset': { 'y': 1, 'x': 0 } },      // вниз
        { 'futureShip': head.x - size, 'offset': { 'y': 0, 'x': -1 } }      // влево
    ];

    const tryDirection = ({ futureShip, offset }) => {
        if (0 <= futureShip && futureShip < config.fieldSize) {
            let shipCells = [];
            let iter = size;

            while(iter) {
                shipCells.push(field[head.y + iter * offset.y][head.x + iter * offset.x]);
                iter--;
            }

            if (shipCells.every(cell => !cell)) {
                shipCells.forEach((cell, index) =>
                    coords.push(
                        new Point(head.y + (index + 1) * offset.y,
                            head.x + (index + 1) * offset.x)
                    )
                )
            }
        }
    };

    // нет смысла выбирать направление для корабля длиной в одну клетку
    if (size) {
        do {
            const randomDirection = _.random(directions.length - 1);
            tryDirection(directions[randomDirection]);
            if (coords.length === 1) {
                directions.splice(randomDirection, 1);
            }

        } while(coords.length === 1 && directions.length);
    }
    return coords;
};

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
            return new Point(Math.floor(index / config.fieldSize), index % config.fieldSize);
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
        const point = empty[_.random(empty.length - 1)];
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

export default generateShip;