import React, { Component, PropTypes } from 'react'
import Editable from '../Editable/Editable'

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

        var newOrder;

        if (source.order < target.order) {
            newOrder = target.order + 0.5;
        }

        if (source.order > target.order) {
            newOrder = target.order - 0.5;
        }
        NotesActions.reorder(source.id, {laneId: target.laneId, order: newOrder});
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

    render() {
        const {connectDragSource, connectDropTarget, isDragging} = this.props;
        return connectDragSource(connectDropTarget(
            <tr className="note-item panel" style={{opacity: isDragging ? 0 : 1}}>
                <td className="note-item-checkbox">
                    <span onClick={this._onStatusUpdate}
                          className="check-btn glyphicon glyphicon-ok"
                          style={{color: this.props.note.status ? '#228B22' : '#FFFFFF'}}/>
                </td>
                <td className="note-item-text">
                    <Editable val={this.props.note.text}
                              onSave={this._onTextUpdate}/>
                </td>
                <td className="note-item-delete">
                    <span onClick={this._onDestroy}
                          className="destroy-btn glyphicon glyphicon-remove"/>
                </td>
            </tr>
        ));
    }

    _onStatusUpdate = (e) => {
        var note = this.props.note;
        var laneId = this.props.laneId;
        NotesActions.update(note.id, laneId, note.order, note.text, !note.status);
    };

    _onTextUpdate = (text) => {
        var note = this.props.note;
        var laneId = this.props.laneId;
        NotesActions.update(note.id, laneId, note.order, text, note.status);
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