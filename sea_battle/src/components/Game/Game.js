import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field } from './../Routing';
import { initialField, AI, generateShip,
         copy, generateSafeArea, configureField } from "../../utils/Routing";
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

const isWinner = (field) =>
    !field.filter(row =>
        !!row.filter(cell =>
            +cell > 0 && +cell !== config.safeValue).length
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
    // const [showResult, end] = useState(false);
    const [AIMemory, memorize] = useState({});
    const [AIIsThinking, think] = useState(false);

    useEffect(() => {
        if (mode === 'prepare') {
            let newAIField = copy(initialField),
                newPlayerField = copy(initialField);

            setAIShips(setShips(newAIField));
            setAIField(newAIField);

            setPlayerShips(setShips(newPlayerField));
            setPlayerField(newPlayerField);

            setGuess(copy(initialField));
            memorize({});
        }
    }, [mode]);

    function handleFieldClick(row, cell, playFor)
    {
        if (mode === 'play' && playFor === 'player' && AIField[row][cell] >= 0 && !AIIsThinking) {
            let copyAIField = copy(AIField);

            configureField(copyAIField, row, cell);
            if (+copyAIField[row][cell] !== (-1) * config.safeValue) {
                const ship = checkShipDestroyed(AIShips, row, cell);
                if (ship) {
                    generateSafeArea(copyAIField, ship, true);
                }
                setAIField(copyAIField);
            } else {
                setAIField(copyAIField);
                let copyPlayerField = copy(playerField);
                let copyGuessField = copy(guessField);
                let copyMemo = AIMemory;
                let value = 0,
                    destroyedShip = false,
                    victory = false;

                const rerender = () => {
                    setGuess(copyGuessField);
                    setPlayerField(copyPlayerField);
                    memorize(copyMemo);
                };

                const createThought = () =>
                    new Promise((resolve, reject) => {
                        if (+value !== (-1) * config.safeValue && !victory) {
                            rerender();
                            think(true);
                            setTimeout(() => {
                                think(false);
                                resolve(AI(copy(copyGuessField), destroyedShip, copyMemo));
                            }, config.timeAIIsWaiting);
                        } else {
                            reject('finished');
                        }
                    });

                const makeAIMove = promise => {
                    promise.then(result => {
                        const { rowAI, cellAI, ...rest } = result;
                        copyMemo = rest;
                        copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                        const ship = checkShipDestroyed(playerShips, rowAI, cellAI);
                        if (ship) {
                            destroyedShip = true;
                            generateSafeArea(copyPlayerField, ship, true);
                            generateSafeArea(copyGuessField, ship, true);
                        }
                        // TODO проверить работает ли выход из цикла при победе
                        victory = isWinner(copyPlayerField);
                        makeAIMove(createThought());
                    }, finished => {
                        rerender();
                    });
                };

                makeAIMove(createThought());
            }
        }
    }

    // TODO сделать компонент модального окна
    useEffect(() => {
        if (mode === 'play') {
            console.log(AIField, playerField);
            if (isWinner(AIField)) {
                alert('Поздравляем! Вы победили!');
                changeMode('prepare');
            } else if (isWinner(playerField)) {
                alert('Это поражение...Увы :(');
                changeMode('prepare');
            }
        }
    }, [playerField, AIField]);

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
