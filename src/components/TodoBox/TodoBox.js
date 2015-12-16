import React, { Component } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

export default class TodoBox extends Component {
    _style = {
        backgroundColor: '#FFF',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        fontFamily: 'Roboto,sans-serif',
        boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.24)',
        borderRadius: '2px',
        width: '330px',
        margin: '20px, 20px'
    };

    render = () => {
        return (
            <div style={this._style}>
                <TodoForm/>
                <TodoList/>
            </div>
        );
    }
}