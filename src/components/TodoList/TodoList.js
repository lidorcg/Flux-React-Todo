import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import TodoStore from '../../stores/NotesStore'
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
                {this.state.todoList.map(this._renderTodo)}
                </tbody>
            </table>
        );
    }

    _renderTodo = (item, i) => {
        return (
            <Todo key={i} todo={item}/>
        );
    };

    _updateTodoList = () => {
        this.setState({todoList: TodoStore.getAll()});
    }

}

export default DragDropContext(HTML5Backend)(TodoList);