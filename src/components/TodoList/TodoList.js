import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import Dispatcher from '../../dispatcher/MyDispatcher'
import TodoConstants from '../../constants/TodoConstants'
import TodoActions from '../../actions/TodoActions'

export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todoList: TodoActions.getAll()};
        Dispatcher.register(this._updateTodoList, TodoConstants.CHANGE);
    }

    render() {
        return (
            <ul className="todo-list">
                {this.state.todoList.map(t => this._renderTodo(t))}
            </ul>
        );
    }

    _renderTodo = (todo) => {
        return (
            <Todo todo={todo}/>
        );
    };

    _updateTodoList = () => {
        this.setState({todoList: TodoActions.getAll()});
    }

}