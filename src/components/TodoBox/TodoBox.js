import React, { Component } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

export default class TodoBox extends Component {
    render = () => {
        return (
            <div className="col s12 m3">
                <ul className="todo-box z-depth-1 collection">
                    <TodoForm/>
                    <TodoList/>
                </ul>
            </div>
        );
    }
}