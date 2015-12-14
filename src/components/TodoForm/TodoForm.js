import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

export default class TodoForm extends Component {

    render() {
        return (
            <div className="todo-form">
                <TodoInput placeHolder="What's next?" onFinish={this._onFinish}/>
            </div>
        );
    }

    _onFinish = (val) => {
        TodoActions.create(val);
    }

}