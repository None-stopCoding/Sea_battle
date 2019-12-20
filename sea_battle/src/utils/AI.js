import _ from 'underscore';
import { config } from './../Config';
import { createListOfEmptyCells, copy } from "./Routing";

const AI = (field, { point, direction }) => {
    const choice = { rowAI: 0, cellAI: 0 };

    const search = () => {
        let random = {},
            value = 0;
        const empty = createListOfEmptyCells(field);

        do {
            random = empty[_.random(empty.length - 1)];
            value = +field[random.y][random.x];
        } while (value < 0 || value === 5 || field[random.y][random.x] === "0");

        return {
            rowAI: random.y,
            cellAI: random.x
        }
    };

    const checkDirection = () => {
        const newCoords = { point: null, direction: null };

        if (point) {
            const futureRow = choice.row + direction.y,
                  futureCell = choice.cell + direction.x;

            if (0 <= futureRow && futureRow < config.fieldSize &&
                    0 <= futureCell && futureCell < config.fieldSize &&
                    !field[futureRow][futureCell]) {
                newCoords.point = copy(choice);
                newCoords.direction = copy(direction);
            }
        } else {

        }

        return newCoords;
    };

    // TODO менять!
    // if (point) {
    //     choice.row = point.y + direction.y;
    //     choice.cell = point.x + direction.x;
    // } else {
    //     const {headRow, headCell} = search();
    //     choice.row = headRow;
    //     choice.cell = headCell;
    // }

    const newCoords = checkDirection();
    return {
        rowAI: choice.rowAI,
        cellAI: choice.cellAI,
        future: newCoords
    };
};

export default AI;