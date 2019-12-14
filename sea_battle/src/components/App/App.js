import React, {useState} from 'react';
import './App.css';
import { Field } from './../Routing';

const App = () => {
    const [mode, changeMode] = useState('prepare');

    return (
        <div id="App">
            <div id="game">
                <div id="fields">
                    <Field for={mode === 'prepare' ? 'player' : 'bot'}
                           mode={mode}/>
                    {
                        mode === 'play' &&
                        <Field for={'player'} mode={mode}/>
                    }
                </div>
                <button id="play_button" onClick={() => changeMode(mode === 'prepare' ? 'play' : 'prepare')}>
                    {mode === 'prepare' ? 'Play!' : 'Restart!'}
                </button>
            </div>
        </div>
    );
};

export default App;
