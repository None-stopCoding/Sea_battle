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
        field[row][cell] = !field[row][cell] ? -5 : (-1) * field[row][cell];
        return field[row][cell];
    };

    const isWinner = (ships, row, cell) => {
        return false;
    };

    useEffect(() => {
        if (mode === 'prepare') {
            let newAIField = AIField.map(row => [...row]),
                newPlayerField = playerField.map(row => [...row]);

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
            if (isWinner(AIShips, row, cell)) {
                alert('Поздравляем! Вы победили!');
                changeMode('prepare');
            } else {
                let copyPlayerField = playerField.map(row => [...row]),
                    copyGuessField = guessField.map(row => [...row]);
                const { rowAI, cellAI } = AI(guessField);

                copyGuessField[rowAI][cellAI] = configureField(copyPlayerField, rowAI, cellAI);
                setGuess(copyGuessField);
                setPlayerField(copyPlayerField);
                if (isWinner(playerShips)) {
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
            <button id="play_button" onClick={() => changeMode(mode === 'prepare' ? 'play' : 'prepare')}>
                {mode === 'prepare' ? 'Play!' : 'Restart!'}
            </button>
        </div>
    );
};

export default Game;
