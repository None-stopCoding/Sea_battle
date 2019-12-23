import React from 'react';
import './App.css';
import { Game, Chat } from './../Routing';

const App = ({ logout, userName }) => {
    console.log(userName);
    return (
        <div id="App">
            <img className="logout" src="./img/logout.png" alt="logout"
                onClick={logout()}/>
            <Game name={userName}/>
            <Chat />
        </div>
    );
};

export default App;
