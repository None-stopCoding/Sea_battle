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
                    destroyed = false,
                    victory = false;

                do {
                    const { rowAI, cellAI, ...rest } = AI(copy(copyGuessField), destroyed, copyMemo);
                    copyMemo = rest;
                    copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                    console.log(copyGuessField, copyPlayerField);
                    const ship = checkShipDestroyed(playerShips, rowAI, cellAI);
                    if (ship) {
                        destroyed = true;
                        generateSafeArea(copyPlayerField, ship, true);
                        generateSafeArea(copyGuessField, ship, true);
                    }
                    // TODO проверить работает ли выход из цикла при победе
                    victory = isWinner(copyPlayerField);
                } while (+value !== (-1) * config.safeValue && !victory);

                setGuess(copyGuessField);
                setPlayerField(copyPlayerField);
                memorize(copyMemo);
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
