import React, { Component } from 'react';
import {config} from "../../Config";
import _ from 'underscore';
import './Chat.css';
import { Input, Messages } from "./../Routing";

function randomColor() {
    return "rgba(" +
        _.random(255) + ", " +
        _.random(255) + ", " +
        _.random(255) + ", 0.65)";
}

class Chat extends Component {
    state = {
        messages: [],
        interval: null,
        color: null
    };

    componentDidMount() {
        this.setState({
            interval: setInterval(() => this.loadMessages(), config.timeLoadChatMessages),
            color: randomColor()
        })
    }

    loadMessages() {
        const messages = [];
        fetch('/api/messages', {
            headers: { ...config.defaultHeaders }
        }).then(res => {
            if (res.status === 200) {
                console.log('Successfully loaded messages');
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(data => {
            data.forEach(message => {
                const { user, game, text, time, isMine } = message;
                messages.push({
                    name: user,
                    text: text,
                    isMine: isMine,
                    game: game,
                    time: time
                });
            });
            const content = document.getElementsByClassName('Message-content');
            content.scrollTop = content.scrollHeight;
            this.setState({messages: messages});
        }).catch(e => console.log(e));
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <div className="Chat">
                <div className="Chat-header">
                    <h1>Общий чат</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    color={this.state.color}
                />
                <Input
                    onSendMessage={this.onSendMessage}
                />
            </div>
        );
    }

    onSendMessage = (text) => {
        fetch('/api/messages', {
            method: 'POST',
            headers: { ...config.defaultHeaders },
            body: JSON.stringify({text: text})
        }).then(res => {
            if (res.status === 200) {
                console.log('Successfully sent message to server');
                this.loadMessages();
            } else {
                throw new Error(res.statusText);
            }
        }).catch(e => console.log(e));
    }
}

export default Chat;