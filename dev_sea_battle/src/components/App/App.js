import React from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { Game, Chat } from './../Routing';

const App = ({ userName }) => {
    console.log(Cookies.get('sid'));
    console.log(userName);
    return (
        <div id="App">
            <Game name={userName}/>
            <Chat />
        </div>
    );
};

export default App;
