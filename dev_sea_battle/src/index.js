import React, {useEffect, useState} from 'react';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';

const Main = () => {
    const [userName, enter] = useState('');

    const logIn = (name) => {
        enter(name);
    };

    return(
        !!userName ? <App userName={userName}/> : <EnterPage logIn={logIn}/>
    );
};

render(
    <Main />,
    document.getElementById('root')
);
