import React, {useEffect, useState} from 'react';
import _ from 'underscore';
import './Game.css';
import { Field, Timer, Ships } from './../Routing';
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
    let destroyedShip = null,
        shipType = null,
        destroyedIndex = null;
    Object.entries(ships).forEach(([ship, params]) => {
        const index = params.units.findIndex(unit =>
            !!unit.filter(point =>
                point.y === row && point.x === cell).length
        );

        if (index !== -1) {
            if (++params.destroyed[index] === params.size) {
                destroyedShip = params.units[index];
                shipType = ship;
                destroyedIndex = index;
                // TODO проверить для бота
            }
        }
    });
    return {
        destroyedShip: destroyedShip,
        shipType: shipType,
        destroyedIndex: destroyedIndex
    }
};

/**
 * TODO подумать над оптимизацией
 * @returns {*}
 * @constructor
 */
const Game = ({ name }) => {
    const [gameID, setGameID] = useState('');
    const [mode, changeMode] = useState('prepare');
    const [refresh, setRefresh] = useState('false');
    const [guessField, setGuess] = useState(copy(initialField));
    const [AIField, setAIField] = useState(copy(initialField));
    const [AIShips, setAIShips] = useState(copy(config.ships));
    const [playerField, setPlayerField] = useState(copy(initialField));
    const [playerShips, setPlayerShips] = useState(copy(config.ships));
    const [AIMemory, memorize] = useState({});
    const [AIIsThinking, think] = useState(false);
    const [hasWon, setVictory] = useState({
        status: false,
        person: ''
    });
    const [play, timer] = useState(true);
    // const [stopTime, changeStopTime] = useState(0);

    useEffect(() => {
        if (mode === 'prepare' || refresh) {
            let newAIField = copy(initialField),
                newPlayerField = copy(initialField);

            setAIShips(setShips(newAIField));
            setAIField(newAIField);

            setPlayerShips(setShips(newPlayerField));
            setPlayerField(newPlayerField);

            setGuess(copy(initialField));
            memorize({});
            setRefresh(false);
        }
    }, [mode, refresh]);

    useEffect(() => {
        if (hasWon.status) {
            if (hasWon.person === 'person') {
                alert('Поздравляем! Вы победили!');
            } else {
                alert('Это поражение...Увы :(');
            }

            changeMode('prepare');
            timer(false);
            setVictory({
                status: false,
                person: ''
            });
            sendGameResult();
        }
    });

    const sendGameResult = () => {
        if (!gameID) {
            console.log('Game ID не задан')
        } else {
            const score = AIField.flat().filter(cell =>
                +cell < 0 && +cell !== (-1) * config.safeValue).length;

            fetch(`/api/records/${gameID}`, {
                method: 'patch',
                headers: { ...config.defaultHeaders },
                body: JSON.stringify({score: score})
            }).then(res => {
                if (res.status === 200) {
                    console.log(`Sent score data successfully`);
                } else {
                    throw new Error(res.statusText);
                }
            }).catch(e => console.log(e));
        }
    };
    
    function handleFieldClick(row, cell, playFor)
    {
        if (mode === 'play' && playFor === 'player' && AIField[row][cell] >= 0 && !AIIsThinking && play) {
            let copyAIField = copy(AIField);

            configureField(copyAIField, row, cell);
            if (+copyAIField[row][cell] !== (-1) * config.safeValue) {
                const { destroyedShip: ship,
                        shipType: type,
                        destroyedIndex: index } = checkShipDestroyed(AIShips, row, cell);
                if (ship) {
                    const copyAIShips = copy(AIShips);
                    copyAIShips[type].units.splice(index, 1);
                    setAIShips(copyAIShips);

                    generateSafeArea(copyAIField, ship, true);
                    checkVictory('person', copyAIField);
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

                const createThought = (needRerender = false) =>
                    new Promise((resolve, reject) => {
                        if (+value !== (-1) * config.safeValue && !victory) {
                            if (needRerender) rerender();
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
                        destroyedShip = false;
                        copyMemo = rest;
                        copyGuessField[rowAI][cellAI] = value = configureField(copyPlayerField, rowAI, cellAI);
                        const { destroyedShip: ship,
                                shipType: type,
                                destroyedIndex: index } = checkShipDestroyed(playerShips, rowAI, cellAI);
                        if (ship) {
                            destroyedShip = true;
                            const copyPlayerShips = copy(playerShips);
                            copyPlayerShips[type].units.splice(index, 1);
                            setPlayerShips(copyPlayerShips);

                            generateSafeArea(copyPlayerField, ship, true);
                            generateSafeArea(copyGuessField, ship, true);
                            victory = checkVictory('AI', copyPlayerField);
                        }
                        makeAIMove(createThought(true));
                    }, finished => {
                        rerender();
                    });
                };

                makeAIMove(createThought());
            }
        }
    }

    const checkVictory = (person, field) => {
        if (isWinner(field)) {
            let competitor = 'person';
            if (person === 'AI') {
                competitor = 'AI';
            }
            setVictory({
                status: true,
                person: competitor
            });
            return true;
        }
        return false;
    };

    const handlePlayRestart = () => {
        if (mode === 'prepare') {
            changeMode('play');
            timer(true);
            fetch('/api/records', {
                method: 'post',
                headers: { ...config.defaultHeaders },
                body: JSON.stringify({ game: "Морской бой" })
            }).then(res => {
                if (res.status === 200) {
                    console.log('Successfully notify server about game start');
                    return res.json();
                } else {
                    throw new Error(res.statusText);
                }
            }).then(data => {
                setGameID(data.id);
            }).catch(e => console.log(e));
        } else {
            timer(false);
            changeMode('prepare');
            sendGameResult();
        }
    };

    // const handleStopTimer = (value) => changeStopTime(value);

    return (
        <div id="game">
            {
                mode === 'play' &&
                <div className="game_header">
                    <Ships fleet={playerShips} name="Smart" player="AI"/>
                    <Timer action={play}/>
                    <Ships fleet={AIShips} name={name} player="user"/>
                </div>
            }
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
            <div className="button_group">
                <img src={`./img/${mode === 'prepare' ? 'power-button' : 'refresh'}.png`} alt="control"
                     onClick={() => handlePlayRestart()}/>
                {
                    mode === 'prepare' ? (
                        <img src={`./img/loop.png`} alt="refresh"
                             onClick={() => setRefresh(true)}/>
                    ) : (
                        <img src={`./img/${play ? "pause" : "play"}.png`} alt="timer"
                             onClick={() => {
                                 if (play) {
                                     sendGameResult();
                                 }
                                 timer(play => !play);
                             }}/>
                    )
                }
            </div>
        </div>
    );
};

export default Game;
