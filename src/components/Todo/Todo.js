import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

export default class Todo extends Component {

    static propTypes = {
        todo: React.PropTypes.object.isRequired
    };

    state = {editing: false};

    render = () => {
        return (
            <tr className="todo-item">
                <td><input type="checkbox"/></td>
                {this.state.editing ? this._renderInput() : this._renderText()}
                <td>
                    <span onClick={this._destroy} className="ptr glyphicon glyphicon-remove"/>
                </td>
            </tr>
        );
    };

    _renderText = () => {
        return (
            <td className="todo-item-text" onClick={this._onClick}>{this.props.todo.text}</td>
        );
    };

    _renderInput = () => {
        return (
            <td className="td-input">
                <TodoInput val={this.props.todo.text}
                           onBlur={this._onBlur}
                           onSave={this._onSave}/>
            </td>
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