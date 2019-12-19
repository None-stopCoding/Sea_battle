import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field } from './../Routing';
import {initialField, AI, generateShip, copy, generateSafeArea} from "../../utils/Routing";
import {config} from "../../Config";

const setShips = (newField) =>
    Object.fromEntries(
        Object.entries(copy(config.ships))
            .map(([ship, params]) => {
                _.times(params.amount, () => {
                    const { coords, renderedField } = generateShip(newField, params.size);

                    params.units.push(coords);
                    newField = renderedField;
                });

                params.destroyed = (new Array(params.amount)).fill(0);
                return [ship, params];
            })
    );

const configureField = (field, row, cell) => {
    const val = (-1) * (!field[row][cell] ? config.safeValue : field[row][cell]);
    field[row][cell] = typeof field[row][cell] === 'string' ? String(val) : val;
    return field[row][cell];
};

const isWinner = (field) =>
    !field.filter(row =>
        !!row.filter(cell =>
            parseInt(cell) > 0 && parseInt(cell) !== config.safeValue).length
    ).length;

const checkShipDestroyed = (ships, row, cell) => {
    let destroyedShip = null;
    Object.entries(ships).forEach(([ship, params]) => {
        const index = params.units.findIndex(unit =>
            !!unit.filter(point =>
                point.y === row && point.x === cell).length
        );

        if (index !== -1) {
            if (++params.destroyed[index] === params.size) {
                destroyedShip = params.units[index];
                // TODO проверить для бота
                // console.log(ship);
            }
        }
    });
    return destroyedShip;
};

/**
 * TODO подумать над оптимизацией
 * @returns {*}
 * @constructor
 */
const Game = () => {
    const [mode, changeMode] = useState('prepare');
    const [guessField, setGuess] = useState(copy(initialField));
    const [AIField, setAIField] = useState(copy(initialField));
    const [AIShips, setAIShips] = useState(copy(config.ships));
    const [playerField, setPlayerField] = useState(copy(initialField));
    const [playerShips, setPlayerShips] = useState(copy(config.ships));
    const [showResult, end] = useState(false);

    useEffect(() => {
        if (mode === 'prepare') {
            let newAIField = copy(initialField),
                newPlayerField = copy(initialField);

            setAIShips(setShips(newAIField));
            setAIField(newAIField);

            setPlayerShips(setShips(newPlayerField));
            setPlayerField(newPlayerField);
        }
    }, [mode]);

    // TODO сделать компонент модального окна
    useEffect(() => {
        if (mode === 'play') {
            if (isWinner(AIField)) {
                alert('Поздравляем! Вы победили!');
                changeMode('prepare');
            } else if (isWinner(playerField)) {
                alert('Это поражение...Увы :(');
                changeMode('prepare');
            }
        }
    }, [playerField, AIField]);

    function handleFieldClick(row, cell, playFor)
    {
        if (mode === 'play' && playFor === 'player' && AIField[row][cell] >= 0) {
            let copyAIField = copy(AIField);

            configureField(copyAIField, row, cell);
            if (parseInt(copyAIField[row][cell]) !== (-1) * config.safeValue) {
                const ship = checkShipDestroyed(AIShips, row, cell);
                if (ship) {
                    generateSafeArea(copyAIField, ship, true);
                }
                setAIField(copyAIField);
            } else {
                let copyPlayerField = copy(playerField),
                    copyGuessField = copy(guessField),
                    value = 0,
                    victory = false;

                setAIField(copyAIField);

                do {
                    const { rowAI, cellAI } = AI(copyGuessField);
                    copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                    const ship = checkShipDestroyed(playerShips, rowAI, cellAI);
                    if (ship) {
                        generateSafeArea(copyPlayerField, ship, true);
                    }
                    // TODO проверить работает ли выход из цикла при победе
                    victory = isWinner(copyPlayerField);
                } while (parseInt(value) !== (-1) * config.safeValue && !victory);

                setGuess(copyGuessField);
                setPlayerField(copyPlayerField);
            }
        }
    }

    return (
        <div id="game">
            <div id="fields">
                <Field playFor={mode === 'prepare' ? 'player' : 'AI'}
                       field={playerField}
                       mode={mode}
                       handleClick={handleFieldClick}/>
                {
                    mode === 'play' &&
                    <Field playFor={'player'}
                           field={AIField}
                           mode={mode}
                           handleClick={handleFieldClick}/>
                }
            </div>
            <button id="play_button" onClick={() => changeMode(mode => mode === 'prepare' ? 'play' : 'prepare')}>
                {mode === 'prepare' ? 'Play!' : 'Restart!'}
            </button>
        </div>
    );
};

export default Game;
