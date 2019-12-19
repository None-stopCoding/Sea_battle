import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field } from './../Routing';
import { initialField, AI, generateShip, copy } from "../../utils/Routing";
import {config} from "../../Config";

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

    const setShips = (newField) =>
        Object.fromEntries(
            Object.entries(copy(config.ships))
                .map(([ship, params]) => {
                    _.times(params.amount, () => {
                        const { coords, renderedField } = generateShip(newField, params.size);

                        params['units'].push(coords);
                        newField = renderedField;
                    });

                    return [ship, params];
                })
        );

    const configureField = (field, row, cell) => {
        field[row][cell] = (-1) * (!field[row][cell] ? config.safeValue : field[row][cell]);
        return field[row][cell];
    };

    // const damageShip = (ships, row, cell) => {
    //     // Object.entries(ships).forEach(([ship, params]) => {
    //     //     params['units'].forEach()
    //     // })
    // };

    const isWinner = (field) =>
        !field.filter(row =>
            !!row.filter(cell =>
                cell > 0 && cell !== config.safeValue).length
        ).length;


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
            let copyAIField = AIField.map(row => [...row]);

            configureField(copyAIField, row, cell);
            setAIField(copyAIField);
            if (copyAIField[row][cell] !== (-1) * config.safeValue) {
                // damageShip(AIShips, row, cell);
            } else {
                let copyPlayerField = copy(playerField),
                    copyGuessField = copy(guessField),
                    value = 0,
                    victory = false;

                do {
                    const { rowAI, cellAI } = AI(copyGuessField);
                    copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                    // damageShip(playerShips, rowAI, cellAI);
                    // TODO проверить работает ли выход из цикла при победе
                    victory = isWinner(copyPlayerField);
                } while (value !== (-1) * config.safeValue && !victory);

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
