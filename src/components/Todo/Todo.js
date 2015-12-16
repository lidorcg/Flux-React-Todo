import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'
import TodoInput from '../TodoInput/TodoInput'

const ListItem = require('material-ui/lib/lists/list-item');
const IconButton = require('material-ui/lib/icon-button');
const CloseIcon = require('react-material-icons/icons/navigation/close');

export default class Todo extends Component {

    static propTypes = {
        todo: React.PropTypes.object.isRequired
    };

    state = {editing: false};

    render = () => {
        return (this.state.editing ? this._renderInput() : this._renderTodo());
    };

    _renderTodo = () => {
        return (
            <ListItem
                primaryText={this.props.todo.text}
                onClick={this._onClick}
                rightIconButton={this._getDeleteButton()}/>
        );
    };

    _getDeleteButton = () => {
        return (
            <IconButton onClick={this._destroy}>
                <CloseIcon/>
            </IconButton>
        );
    };

    _renderInput = () => {
        return (
            <TodoInput val={this.props.todo.text}
                       onBlur={this._onBlur}
                       onSave={this._onSave}/>
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