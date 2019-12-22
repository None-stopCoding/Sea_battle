import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';
import {config} from "./Config";

const Main = () => {
    const [userName, enter] = useState('');
    const [authToken, setToken] = useState(Cookies.get('sid'));

    useEffect(() => {
        // console.log(authToken);
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
        const token = Cookies.get('sid');
        console.log("document.cookie ", document.cookie);
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
