import React, { Component } from 'react';
import _ from 'underscore';
import './Chat.css';
import { Input, Messages } from "./../Routing";

function randomColor() {
    return "rgba(" +
        _.random(255) + ", " +
        _.random(255) + ", " +
        _.random(255) + ", 0.8)";
}

class Chat extends Component {
    state = {
        messages: [],
        member: {
            username: 'name',
            color: randomColor(),
        }
    };

    render() {
        return (
            <div className="Chat">
                <div className="Chat-header">
                    <h1>Общий чат</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input
                    onSendMessage={this.onSendMessage}
                />
            </div>
        );
    }

    onSendMessage = (message) => {
        const messages = this.state.messages;
        const member = this.state.member;
        messages.push({member,text: message});
        this.setState({messages});
    }

}

export default Chat;