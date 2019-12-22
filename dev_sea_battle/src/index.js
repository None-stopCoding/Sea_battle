import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';
import {config} from "./Config";

const cookies = new Cookies();

const Main = () => {
    const [userName, enter] = useState('');
    const [authToken, setToken] = useState(cookies.get('sid'));

    useEffect(() => {
        if (authToken) {
            fetch('/api/users', {
                headers: {
                    ...config.defaultHeaders,
                    'Cookie': 'sid=' + authToken
                }
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
        const token = cookies.get('sid');
        console.log(cookies);
        if (token) {
            setToken(token);
        }
    };

    return(
        authToken || userName ? <App userName={userName}/> : <EnterPage logIn={logIn}/>
    );
};

render(
    <Main />,
    document.getElementById('root')
);
