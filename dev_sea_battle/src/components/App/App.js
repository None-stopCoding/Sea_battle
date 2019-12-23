import React, { useState } from 'react';
import './App.css';
import { Game, Chat, Modal, Record } from './../Routing';


const App = ({ logout, userName }) => {
    const [show, toggle] = useState(false);

    const showModal = (e) => {
        toggle(prev => !prev);
    };

    return (
        <div className="App" >
            <div className="control_buttons">
                <img className="button__left_control" src="./img/logout.png" alt="logout"
                     onClick={() => logout()}/>
                <img className="button__left_control" src="./img/records.png" alt="records"
                     onClick={(e) => showModal()}/>
            </div>
            <Modal show={show} onClose={showModal}>
                <Record />
            </Modal>
            <Game name={userName}/>
            <Chat name={userName}/>
        </div>
    );
};

export default App;
