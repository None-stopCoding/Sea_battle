import _ from 'underscore';
import { config } from './../Config';

const AI = (field) => {
    const randomRow = _.random(config.fieldSize - 1);
    const randomCell = _.random(config.fieldSize - 1);

    return {
        rowAI: randomRow,
        cellAI: randomCell
    }
};

export default AI;