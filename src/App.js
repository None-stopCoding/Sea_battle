import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: 'name',
      color: randomColor(),
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Чат</h1>
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

export default App;
