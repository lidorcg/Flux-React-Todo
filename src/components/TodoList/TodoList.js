import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import TodoStore from '../../stores/TodoStore'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {todoList: TodoStore.getAll()};
    }

    componentDidMount() {
        TodoStore.addCallback(this._updateTodoList);
    }

    componentWillUnmount() {
        TodoStore.removeCallback(this._updateTodoList);
    }

    render() {
        return (
            <table className="table table-hover ">
                <tbody>
                {this.state.todoList.map(t => this._renderTodo(t))}
                </tbody>
            </table>
        );
    }

    _renderTodo = (todo) => {
        return (
            <Todo todo={todo}/>
        );
    };

    _updateTodoList = () => {
        this.setState({todoList: TodoStore.getAll()});
    }

}

export default DragDropContext(HTML5Backend)(TodoList);