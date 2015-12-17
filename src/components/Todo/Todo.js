import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

const Checkbox = require('material-ui/lib/checkbox');

export default class Todo extends Component {

    static propTypes = {
        todo: React.PropTypes.object.isRequired
    };

    state = {editing: false};

    render = () => {
        return (this.state.editing ? this._renderInput() : this._renderTodo());
    };

    _style = {
        height: '48px',
        listStyleType: 'none',
        margin: '0px',
        borderBottom: '1px solid #E0E0E0',
        display: 'table',
        width: '100%',
        tableLayout: 'fixed',
        borderSpacing: '10px'
    };

    _renderTodo = () => {
        return (
            <li style={this._style}>
                <input type="checkbox"/>
                <span onClick={this._onClick}>{this.props.todo.text}</span>
                <button onClick={this._destroy}>&#x2718;</button>
            </li>
        );
    };

    _renderInput = () => {
        return (
            <div className="todo-item">
                <TodoInput val={this.props.todo.text} onBlur={this._onBlur} onSave={this._onSave}/>
            </div>

        );
    };

    _onClick = () => {
        this.setState({editing: true});
    };

    _onSave = (val) => {
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