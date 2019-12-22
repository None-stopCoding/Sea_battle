import React from 'react';
import './App.css';
import { Game, Chat } from './../Routing';

const App = ({ userName }) => {
    return (
        <div id="App">
            <Game name={userName}/>
            <Chat />
        </div>
    );
};

export default App;
