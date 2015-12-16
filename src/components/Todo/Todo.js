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
        fontSize: '15px',
        boxSizing: 'inherit',
        listStyleType: 'none',
        backgroundColor: '#FFF',
        lineHeight: '1.5rem',
        padding: '10px 20px',
        margin: '0px',
        borderBottom: '1px solid #E0E0E0',
        minHeight: '84px',
        paddingLeft: '72px',
        position: 'relative',
        color: '#D1D1D1'
    };

    _renderTodo = () => {
        return (
            <li style={this._style}>
                <Checkbox/>
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