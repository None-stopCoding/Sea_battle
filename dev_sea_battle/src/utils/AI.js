import _ from 'underscore';
import {config} from './../Config';
import {copy, createListOfEmptyCells} from "./Routing";

const AI = (field, destroyed, points) => {
    const { startPoint, endPoint } = points.ship || {startPoint: null, endPoint: null};
    const choice = { row: null, cell: null },
        ship = {
            startPoint: null,
            endPoint: null
        };

    const searchStartPoint = () => {
        let random = {},
            value = 0;
        const empty = createListOfEmptyCells(field);

        do {
            random = empty[_.random(empty.length - 1)];
            value = +field[random.y][random.x];
        } while (value < 0 || value === 5 || field[random.y][random.x] === "0");

        return {
            headRow: random.y,
            headCell: random.x
        }
    };

    const checkCanVisit = (row, cell) =>
        0 <= row && row < config.fieldSize &&
        0 <= cell && cell < config.fieldSize;

    const getMovedEndPoint = (point, invert = false) => {
        const diffRow = endPoint.row - startPoint.row,
            diffCell = endPoint.cell - startPoint.cell,
            index = invert ? (-1) : 1;
        return {
            row: !diffRow ? point.row : point.row + index * (diffRow / Math.abs(diffRow)),
            cell: !diffCell ? point.cell : point.cell + index * (diffCell / Math.abs(diffCell))
        };
    };

    const searchEndPoint = () => {
        const tail = {
            tailRow: null,
            tailCell: null
        };

        // if (missedShot) {
        const directions = [
            { offset: { row: -1, cell: 0 } },     // вверх
            { offset: { row: 0, cell: 1 } },      // вправо
            { offset: { row: 1, cell: 0 } },      // вниз
            { offset: { row: 0, cell: -1 } }      // влево
        ];
        const availableDirs = directions.filter(dir =>
            checkCanVisit(startPoint.row + dir.offset.row, startPoint.cell + dir.offset.cell) &&
                    !field[startPoint.row + dir.offset.row][startPoint.cell + dir.offset.cell]);
        if ((startPoint.row - endPoint.row) && (startPoint.cell - endPoint.cell)) {
            const movedEndPoint = getMovedEndPoint(startPoint);
            const tryIndex =
                availableDirs.findIndex(dir =>
                    dir.offset.row === movedEndPoint.row - startPoint.row &&
                    dir.offset.cell === movedEndPoint.cell - startPoint.cell);
            if (tryIndex !== -1) {
                tail.tailRow = startPoint.row + availableDirs[tryIndex].offset.row;
                tail.tailCell = startPoint.cell + availableDirs[tryIndex].offset.cell;
            }
        }

        if (tail.tailCell === null) {
            const tryDir = availableDirs[_.random(availableDirs.length - 1)].offset;
            tail.tailRow = startPoint.row + tryDir.row;
            tail.tailCell = startPoint.cell + tryDir.cell;
        }
        return tail;
    };

    if (!startPoint ||
            field[startPoint.row][startPoint.cell] === (-1) * config.safeValue ||
            destroyed) {
        const { headRow, headCell } = searchStartPoint();
        choice.row = headRow;
        choice.cell = headCell;
        ship.startPoint = copy(choice);
        ship.endPoint = copy(choice);
    } else if (!endPoint ||
            (startPoint.row === endPoint.row && startPoint.cell === endPoint.cell) ||
            field[endPoint.row][endPoint.cell] === (-1) * config.safeValue) {
        const { tailRow, tailCell } = searchEndPoint();
        choice.row = tailRow;
        choice.cell = tailCell;
        ship.startPoint = startPoint;
        ship.endPoint = copy(choice);
    } else {
        const movedEndPoint = getMovedEndPoint(endPoint);
        let tailRow = movedEndPoint.row,
            tailCell = movedEndPoint.cell;

        if (!(checkCanVisit(tailRow, tailCell) && Math.abs(+field[tailRow][tailCell]) !== config.safeValue)) {
            const newEndPoint = searchEndPoint();
            tailRow = newEndPoint.tailRow;
            tailCell = newEndPoint.tailCell;
        }

        choice.row = tailRow;
        choice.cell = tailCell;
        ship.startPoint = startPoint;
        ship.endPoint = copy(choice);
    }

    return {
        rowAI: choice.row,
        cellAI: choice.cell,
        ship: ship
    }
};

export default AI;