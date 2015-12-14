import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

export default class Todo extends Component {

    static propTypes = {
        todo: React.PropTypes.object.isRequired
    };

    state = {editing: false};

    render() {
        return (this.state.editing ? this._renderInput() : this._renderTodo());
    }

    _renderTodo = () => {
        return (
            <div className="todo-item">
                <button onClick={this._destroy}>&#x2718;</button>
                <li onClick={this._onClick}>
                    {this.props.todo.text}
                </li>
            </div>
        );
    };

    _renderInput = () => {
        return (
            <div className="todo-item">
                <TodoInput val={this.props.todo.text} onBlur={this._onBlur} onFinish={this._onFinish}/>
            </div>

        );
    };

    _onClick = () => {
        this.setState({editing: true});
    };

    _onFinish = (val) => {
        TodoActions.update(this.props.todo.id, val);
        this.setState({editing: false});
    };

    _onBlur = () => {
        this.setState({editing: false});
    };

    _destroy = () => {
        TodoActions.destroy(this.props.todo.id);
    }
}