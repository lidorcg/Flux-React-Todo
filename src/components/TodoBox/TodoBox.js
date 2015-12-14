import React, { Component } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

export default class TodoBox extends Component {
    render() {
        return (
            <div className="todo-box">
                <TodoForm/>
                <TodoList/>
            </div>
        );
    }
}