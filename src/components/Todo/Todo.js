import React, { Component, PropTypes } from 'react'
import TodoInput from './TodoInput'
import TodoCheckbox from './TodoCheckbox'

import TodoActions from '../../actions/TodoActions'

import ItemTypes from '../../constants/ItemTypes'
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';


const todoSource = {
    beginDrag(props) {
        return {
            todo: props.todo
        };
    },
    isDragging(props, monitor) {
        return props.todo.id === monitor.getItem().todo.id;
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const todoTarget = {
    hover(targetProps, monitor) {
        const targetTodo = targetProps.todo;
        const sourceTodo = monitor.getItem().todo;

        if (targetTodo.id === sourceTodo.id) {
            return;
        }

        var newPlace;

        if (sourceTodo.order < targetTodo.order) {
            newPlace = targetTodo.order + 0.5;
        }

        if (sourceTodo.order > targetTodo.order) {
            newPlace = targetTodo.order - 0.5;
        }
        TodoActions.reorder(sourceTodo.id, newPlace);
    }
};

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}


class Todo extends Component {
    static propTypes = {
        todo: PropTypes.object.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    state = {editing: false};

    render() {
        const {connectDragSource, connectDropTarget, isDragging} = this.props;
        return connectDragSource(connectDropTarget(
            <tr className="todo-item panel" style={{opacity: isDragging ? 0 : 1}}>
                <td><TodoCheckbox onStatusChange={this._onStatusUpdate} status={this.props.todo.status}/></td>
                {this.state.editing ? this._renderInput() : this._renderText()}
                <td>
                    <span onClick={this._onDestroy} className="destroy-btn glyphicon glyphicon-remove"/>
                </td>
            </tr>
        ));
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
                           onSave={this._onTextUpdate}/>
            </td>
        );
    };

    _onClick = () => {
        this.setState({editing: true});
    };

    _onInputBlur = () => {
        this.setState({editing: false});
    };

    _onStatusUpdate = (e) => {
        var todo = this.props.todo;
        TodoActions.update(todo.id, todo.order, todo.text, e.target.checked);
    };

    _onTextUpdate = (val) => {
        var todo = this.props.todo;
        TodoActions.update(todo.id, todo.order, val, todo.status);
        this.setState({editing: false});
    };

    _onDestroy = () => {
        TodoActions.destroy(this.props.todo.id);
    }
}

export default flow(
    DragSource(ItemTypes.TODO, todoSource, collectSource),
    DropTarget(ItemTypes.TODO, todoTarget, collectTarget)
)(Todo);