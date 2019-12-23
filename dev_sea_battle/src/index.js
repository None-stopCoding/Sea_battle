import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './index.css';
import { App, EnterPage } from './components/Routing';
import {config} from "./Config";

const Main = () => {
    const [userName, enter] = useState('');

    // useEffect(() => {
    //     fetch('/api/users', {
    //         headers: { ...config.defaultHeaders }
    //     }).then(res => {
    //         if (res.status === 200) {
    //             return res.json();
    //         }
    //         throw new Error(res.statusText);
    //     }).then(data => {
    //         console.log(data);
    //         enter('blabla');
    //     }).catch(e => alert(`Ошибка: ${e.message}`));
    // }, []);

    const logIn = (name) => {
        enter(name);
    };

    const logout = () => {
        fetch('/api/users', {
            method: 'delete',
            headers: { ...config.defaultHeaders }
        }).then(res => {
            if (res.status === 200) {
                console.log('logout successful');
                enter('');
            } else {
                throw new Error(res.statusText);
            }
        }).catch(e => alert(e));
    };

    return(
        userName ? <App logout={logout} userName={userName}/> : <EnterPage logIn={logIn}/>
    );
};

render(
    <Main />,
    document.getElementById('root')
);
