import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'
import ListItem from 'material-ui/lib/lists/list-item'

export default class TodoForm extends Component {
    render = () => {
        return (
            <ListItem primaryText={this._getTodoInput()}/>
        );
    };

    _getTodoInput = () => {
        return (
            <TodoInput placeHolder="What's next?" onSave={this._onSave}/>
        );
    };

    _onSave = (val) => {
        TodoActions.create(val);
    }

}