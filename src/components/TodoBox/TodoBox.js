import React, { Component } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';

export default class TodoBox extends Component {
    render = () => {
        return (
        <div className="panel panel-default todo-box">
            <div className="panel-body">
                <TodoForm/>
                <TodoList/>
            </div>
        </div>
        );
    }
}