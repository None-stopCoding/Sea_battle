import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field } from './../Routing';
import { initialField, AI, generateShip } from "../../utils/Routing";
import {config} from "../../Config";

/**
 * TODO подумать над оптимизацией
 * @returns {*}
 * @constructor
 */
const Game = () => {
    const [mode, changeMode] = useState('prepare');
    const [guessField, setGuess] = useState(initialField.map(row => [...row]));
    const [AIField, setAIField] = useState(initialField.map(row => [...row]));
    const [AIShips, setAIShips] = useState(JSON.parse(JSON.stringify(config.ships)));
    const [playerField, setPlayerField] = useState(initialField.map(row => [...row]));
    const [playerShips, setPlayerShips] = useState(JSON.parse(JSON.stringify(config.ships)));

    const setShips = (newField) =>
        Object.fromEntries(
            Object.entries(JSON.parse(JSON.stringify(config.ships)))
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

    const damageShip = (ships, row, cell) => {
        // Object.entries(ships).forEach(([ship, params]) => {
        //     params['units'].forEach()
        // })
    };

    const isWinner = (ships) =>
        !Object.entries(ships).filter(([ship, params]) =>
            !!params['units'].filter(unit =>
                !!unit.length
            ).length
        ).length;

    useEffect(() => {
        if (mode === 'prepare') {
            let newAIField = initialField.map(row => [...row]),
                newPlayerField = initialField.map(row => [...row]);

            setAIShips(setShips(newAIField));
            setAIField(newAIField);

            setPlayerShips(setShips(newPlayerField));
            setPlayerField(newPlayerField);
        }
    }, [mode]);

    function handleFieldClick(row, cell, playFor)
    {
        if (mode === 'play' && playFor === 'player' && AIField[row][cell] >= 0) {
            let copyAIField = AIField.map(row => [...row]);

            configureField(copyAIField, row, cell);
            setAIField(copyAIField);
            if (copyAIField[row][cell] !== (-1) * config.safeValue) {
                // damageShip(AIShips, row, cell);
                if (isWinner(AIShips)) {
                    alert('Поздравляем! Вы победили!');
                    changeMode('prepare');
                }
            } else {
                let copyPlayerField = playerField.map(row => [...row]),
                    copyGuessField = guessField.map(row => [...row]),
                    value = 0,
                    victory = false;

                do {
                    const { rowAI, cellAI } = AI(copyGuessField);
                    copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                    // damageShip(playerShips, rowAI, cellAI);
                    victory = isWinner(playerShips, rowAI, cellAI);
                } while (value !== (-1) * config.safeValue && !victory);

                setGuess(copyGuessField);
                setPlayerField(copyPlayerField);
                if (victory) {
                    alert('Это поражение...Увы :(');
                    changeMode('prepare');
                }
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
