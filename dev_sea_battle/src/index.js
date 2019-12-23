import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';
import {config} from "./Config";

const Main = () => {
    const [userName, enter] = useState('');

    useEffect(() => {
        // console.log(authToken);
        if (userName) {
            fetch('/api/users', {
                headers: { ...config.defaultHeaders }
            }).then(res => {
                if (res.status === 200) {
                    return res.json();
                }
                throw new Error(res.statusText);
            }).then(data => {
                console.log(data);
                enter('blabla');
            }).catch(e => alert(`Ошибка: ${e.message}`));
        }
    }, []);

    const logIn = (name) => {
        enter(name);
    };

    return(
        userName ? <App userName={userName}/> : <EnterPage logIn={logIn}/>
    );
};

render(
    <Main />,
    document.getElementById('root')
);
