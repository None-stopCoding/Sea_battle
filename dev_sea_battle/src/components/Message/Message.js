import {Component} from "react";
import React from "react";
import _ from "underscore";

function randomColor() {
    return "rgba(" +
        _.random(255) + ", " +
        _.random(255) + ", " +
        _.random(255) + ", 0.65)";
}

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
        const {member, text} = message;
        const {currentMember} = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ?
            "Messages-message currentMember" : "Messages-message";
        return (
            <li className={className}>
                <div className="Message-content">
                    {
                        !messageFromMe &&
                        <div className="username">
                            { member.username}
                        </div>
                    }
                    <div className="text" style={{backgroundColor: currentMember.color}}>{text}</div>
                </div>
            </li>
        );
    }
}

export default Message;