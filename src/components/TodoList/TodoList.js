import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import TodoStore from '../../stores/TodoStore'
import List from 'material-ui/lib/lists/list'

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
            <List>
                {this.state.todoList.map(t => this._renderTodo(t))}
            </List>
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