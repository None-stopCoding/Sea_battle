import _ from 'underscore';
import { config } from './../Config';

const AI = (field) => {
    let randomRow = 0,
        randomCell =0;

    do {
        randomRow = _.random(config.fieldSize - 1);
        randomCell = _.random(config.fieldSize - 1);
    } while (field[randomRow][randomCell] < 0);

    return {
        rowAI: randomRow,
        cellAI: randomCell
    }
};

export default AI;