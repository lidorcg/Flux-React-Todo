import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

export default class TodoForm extends Component {

    _style = {
        borderBottom: '1px solid #E0E0E0'
    };

    render = () => {
        return (
            <div style={this._style}>
                <TodoInput placeHolder="What's next?" onSave={this._onSave}/>
            </div>
        );
    };

    _onSave = (val) => {
        TodoActions.create(val);
    }

}