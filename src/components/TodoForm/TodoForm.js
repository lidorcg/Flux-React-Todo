import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'
import ListItem from 'material-ui/lib/lists/list-item'

export default class TodoForm extends Component {
    _style = {
        padding: 10
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