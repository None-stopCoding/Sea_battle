import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';

const cookies = new Cookies();

const Main = () => {
    const [userName, enter] = useState('');
    const [authToken, setToken] = useState(cookies.get('sid'));

    const logIn = (name, token) => {
        enter(name);
        setToken(token);
    };

    return(
        !!authToken ? <App userName={userName}/> : <EnterPage logIn={logIn}/>
    );
};

render(
    <Main />,
    document.getElementById('root')
);
