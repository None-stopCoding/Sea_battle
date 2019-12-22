import {config} from "../Config";

/**
 * Двумерный массив (квадрат), заданного размера, заполненный нулями
 * @type {any[]}
 */
const initialField = (new Array(config.fieldSize)).fill(
    (new Array(config.fieldSize)).fill(0)
);

export default initialField;