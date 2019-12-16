import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field } from './../Routing';
import { initialField, AI, generateShip } from "../../utils/Routing";
import {config} from "../../Config";


//
// function handleClick(row, cell) {
//     // console.log(mode, playFor, field[row][cell]);
//
// }


//


const Game = () => {
    const [mode, changeMode] = useState('prepare');
    const [AIGuessedField, guess] = useState(initialField.map(row => row.slice()));
    const [AIField, setAIField] = useState(initialField.map(row => row.slice()));
    const [AIShips, setAIShips] = useState(config.ships);
    const [playerField, setPlayerField] = useState(initialField.map(row => row.slice()));
    const [playerShips, setPlayerShips] = useState(config.ships);

    const setShips = (newField) =>
        Object.fromEntries(
            Object.entries(config.ships)
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
        if (field[row][cell] >= 0) {
            // console.log('clicked');
            field[row][cell] = !field[row][cell] ? -5 : (-1) * field[row][cell];
        }

        return field[row][cell];
    };

    const isWinner = ships => {
        return false;
    };

    useEffect(() => {
        if (mode === 'prepare') {
            console.log(mode);
            let newAIField = AIField.map(row => row.slice()),
                newPlayerField = playerField.map(row => row.slice());

            setAIShips(setShips(newAIField));
            setAIField(newAIField);

            setPlayerShips(setShips(newPlayerField));
            setPlayerField(newPlayerField);
        }
    }, [mode]);

    function handleFieldClick(row, cell, playFor)
    {
        if (mode === 'play' && playFor === 'player') {
            console.log('clicked');
            configureField(playerField, row, cell);
            setPlayerField(playerField);
            if (isWinner(playerShips)) {
                alert('Поздравляем! Вы победили!');
                changeMode('prepare');
            } else {
                const { rowAI, cellAI } = AI(AIGuessedField);
                AIGuessedField[rowAI][cellAI] = configureField(AIField, rowAI, cellAI);
                guess(AIGuessedField);
                setAIField(AIField);
                if (isWinner(AIShips)) {
                    alert('Это поражение...Увы :(');
                    changeMode('prepare');
                }
            }
        }
    }

    return (
        <div id="game">
            <div id="fields">
                <Field playFor={mode === 'prepare' ? 'player' : 'bot'}
                       field={mode === 'prepare' ? playerField : AIField}
                       mode={mode}
                       handleClick={handleFieldClick}/>
                {
                    mode === 'play' &&
                    <Field playFor={'player'}
                           field={playerField}
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
