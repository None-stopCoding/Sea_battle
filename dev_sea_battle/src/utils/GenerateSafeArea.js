import { config } from "../Config";

/**
 * Грубо говоря пробегаемся по каждой клетке корабля и смотрим
 *  во все 8 условий (4 угла 4 стороны)
 * @param field
 * @param coords
 * @param toString
 */
const generateSafeArea = (field, coords, toString = false) => {
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
                    (toString ? Math.abs(field[row][cell]) === config.safeValue || !field[row][cell]: !field[row][cell])) {

                    field[row][cell] = toString ? String(field[row][cell]) : safe;
                }
            });
        });
    });
};

export default generateSafeArea;