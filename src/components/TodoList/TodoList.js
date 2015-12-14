import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import TodoStore from '../../stores/TodoStore'

export default class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todoList: TodoStore.getAll()};
    }

    componentDidMount = () => {
        TodoStore.addCallback(this._updateTodoList);
    };

    componentWillUnmount = () => {
        TodoStore.removeCallback(this._updateTodoList);
    };

    render = () => {
        return (
            <ul className="todo-list">
                {this.state.todoList.map(t => this._renderTodo(t))}
            </ul>
        );
    };

    _renderTodo = (todo) => {
        return (
            <Todo todo={todo}/>
        );
    };

    _updateTodoList = () => {
        this.setState({todoList: TodoStore.getAll()});
    }

}