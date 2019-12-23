import React, { useEffect, useState } from "react";
import './Modal.css';


const Modal = ({ onClose, show, children }) => {
    const handleOnClose = e => onClose && onClose(e);

    if (!show) {
        return null;
    }

    return (
        <div className="modal_records" id="modal_rec">
            <h2> Топ игроков "Морской бой"</h2>
            <div className="content_records">
                {children}
            </div>
            <div className="actions_records">
                <button className="toggle-button" onClick={() => handleOnClose()}>
                    Закрыть
                </button>
            </div>
        </div>
    );
};

export default Modal;