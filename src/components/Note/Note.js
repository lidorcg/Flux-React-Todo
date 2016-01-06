import React, { Component, PropTypes } from 'react'
import Input from './Input'
import Checkbox from './Checkbox'

import NotesActions from '../../actions/NotesActions'

import ItemTypes from '../../constants/ItemTypes'
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';


const noteSource = {
    beginDrag(props) {
        return {
            note: props.note
        };
    },
    isDragging(props, monitor) {
        return props.note.id === monitor.getItem().note.id;
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

const noteTarget = {
    hover(targetProps, monitor) {
        const target = targetProps.note;
        const source = monitor.getItem().note;

        if (target.id === source.id) {
            return;
        }

        var newPlace;

        if (source.order < target.order) {
            newPlace = target.order + 0.5;
        }

        if (source.order > target.order) {
            newPlace = target.order - 0.5;
        }
        NotesActions.reorder(source.id, newPlace);
    }
};

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}


class Note extends Component {
    static propTypes = {
        laneId: PropTypes.string.isRequired,
        note: PropTypes.object.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    state = {editing: false};

    render() {
        const {connectDragSource, connectDropTarget, isDragging} = this.props;
        return connectDragSource(connectDropTarget(
            <tr className="note-item panel" style={{opacity: isDragging ? 0 : 1}}>
                <td><Checkbox onStatusChange={this._onStatusUpdate} status={this.props.note.status}/></td>
                {this.state.editing ? this._renderInput() : this._renderText()}
                <td>
                    <span onClick={this._onDestroy} className="destroy-btn glyphicon glyphicon-remove"/>
                </td>
            </tr>
        ));
    }

    _renderText = () => {
        return (
            <td className="note-item-text" onClick={this._onClick}>{this.props.note.text}</td>
        );
    };

    _renderInput = () => {
        return (
            <td>
                <Input val={this.props.note.text}
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
        var note = this.props.note;
        var laneId = this.props.laneId;
        NotesActions.update(note.id, laneId, note.order, note.text, e.target.checked);
    };

    _onTextUpdate = (val) => {
        var note = this.props.note;
        var laneId = this.props.laneId;
        NotesActions.update(note.id, laneId, note.order, val, note.status);
        this.setState({editing: false});
    };

    _onDestroy = () => {
        NotesActions.destroy(this.props.note.id);
    }
}

export default flow(
    DragSource(ItemTypes.NOTE, noteSource, collectSource),
    DropTarget(ItemTypes.NOTE, noteTarget, collectTarget)
)(Note);