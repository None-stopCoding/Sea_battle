import {Component} from "react";
import React from "react";

class Message extends Component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="Messages-list">
                {messages.map(m => this.renderMessage(m))}
            </ul>
        );
    }

    renderMessage(message) {
        const {name, text, color, isMine, game, time} = message;
        const messageFromMe = isMine;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
                <div className="Message-content">
                    {
                        !messageFromMe &&
                        <div className="username">
                            {name} -> {game}
                        </div>
                    }
                    <div className="text" style={{backgroundColor: color}}>{text}</div>
                    <div className="text">{time}</div>
                </div>
            </li>
        );
    }
}

export default Message;