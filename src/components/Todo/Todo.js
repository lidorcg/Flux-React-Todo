import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from './TodoInput'
import TodoCheckbox from './TodoCheckbox'

export default class Todo extends Component {

    static propTypes = {
        todo: React.PropTypes.object.isRequired
    };

    state = {editing: false};

    render() {
        return (
            <tr className="todo-item">

                <td><TodoCheckbox onStatusChange={this._onStatusChange} status={this.props.todo.status}/></td>
                {this.state.editing ? this._renderInput() : this._renderText()}
                <td>
                    <span onClick={this._onDestroy} className="destroy-btn glyphicon glyphicon-remove"/>
                </td>
            </tr>
        );
    }

    _renderText = () => {
        return (
            <td className="todo-item-text" onClick={this._onClick}>{this.props.todo.text}</td>
        );
    };

    _renderInput = () => {
        return (
            <td className="td-input">
                <TodoInput val={this.props.todo.text}
                           onBlur={this._onInputBlur}
                           onSave={this._onTextChange}/>
            </td>
        );
    };


    _onStatusChange = (e) => {
        TodoActions.update(this.props.todo.id, this.props.todo.text, e.target.checked);
    };

    _onClick = () => {
        this.setState({editing: true});
    };

    _onTextChange = (val) => {
        TodoActions.update(this.props.todo.id, val, this.props.todo.done);
        this.setState({editing: false});
    };

    _onInputBlur = () => {
        this.setState({editing: false});
    };

    _onDestroy = () => {
        TodoActions.destroy(this.props.todo.id);
    }
}