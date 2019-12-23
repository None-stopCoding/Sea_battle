import {Component} from "react";
import React from "react";
import {convertUnix} from "../../utils/Routing";

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
        const {name, text, isMine, game, time} = message;
        const messageFromMe = isMine;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
                <div className="Message-content">
                    {
                        !messageFromMe &&
                        <div className="username">
                            <strong>
                                {name}
                                <span>{game && ' -> '}</span>
                                {game}
                            </strong>
                        </div>
                    }
                    <div className="text" style={{backgroundColor: this.props.color}}>{text}</div>
                    <div className="time">{convertUnix(time)}</div>
                </div>
            </li>
        );
    }
}

export default Message;