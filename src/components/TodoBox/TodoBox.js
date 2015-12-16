import React, { Component } from 'react'
import TodoForm from '../TodoForm/TodoForm'
import TodoList from '../TodoList/TodoList'
import List from 'material-ui/lib/lists/list'
const ListDivider = require('material-ui/lib/lists/list-divider');
import Paper from 'material-ui/lib/paper'

export default class TodoBox extends Component {
    _style = {
        width: 300
    };

    render = () => {
        return (
            <Paper style={this._style}>
                <List>
                    <TodoForm/>
                    <ListDivider/>
                    <TodoList/>
                </List>
            </Paper>
        );
    }
}