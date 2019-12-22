import { config } from "../Config";
import { Point } from "./Routing";

/**
 * Отдает список разрешенных клеток (с координатами), те, что пустые
 * @param field
 * @returns {[]}
 */
const createListOfEmptyCells = (field) =>
    field.flat().map((cell, index) => {
        if (!cell) {
            return new Point(Math.floor(index / config.fieldSize), index % config.fieldSize);
        }
    }).filter(cell => cell instanceof Point);

export default createListOfEmptyCells;