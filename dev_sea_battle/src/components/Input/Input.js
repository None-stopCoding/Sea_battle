import {Component} from "react";
import React from "react";

class Input extends Component {
    state = {
        text: ""
    };

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSendMessage(this.state.text);
        this.setState({text:""});
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={e => this.onSubmit(e)} className="chat_form">
                    <input
                        className="chat_input"
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text"
                        placeholder="Введите сообщение"
                    />
                    <button className="chat_button">Отправить</button>
                </form>
            </div>
        );
    }
}

export default Input;