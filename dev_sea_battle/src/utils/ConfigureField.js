import {config} from "../Config";

const configureField = (field, row, cell) => {
    const val = (-1) * (!+field[row][cell] ? config.safeValue : +field[row][cell]);
    field[row][cell] = typeof field[row][cell] === 'string' ? String(val) : val;
    return field[row][cell];
};

export default configureField;