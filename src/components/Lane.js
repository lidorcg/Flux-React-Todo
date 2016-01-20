import React, { Component, PropTypes } from 'react'

import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/function/flow';
import ItemTypes from '../constants/ItemTypes'

import LanesActions from '../actions/LanesActions'

import Editable from './Editable'
import NoteForm from './NoteForm'
import NotesList from './NotesList'

const laneSource = {
    beginDrag(props) {
        return {
            lane: props.lane
        };
    },
    isDragging(props, monitor) {
        return props.lane.id === monitor.getItem().lane.id;
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

const laneTarget = {
    hover(targetProps, monitor) {
        const target = targetProps.lane;
        const source = monitor.getItem().lane;

        if (target.id === source.id) {
            return;
        }

        var newOrder;

        const sourceOrder = Number(source.order);
        const targetOrder = Number(target.order);

        if (sourceOrder < targetOrder) {
            newOrder = targetOrder + 0.5;
        }
        if (sourceOrder > targetOrder) {
            newOrder = targetOrder - 0.5;
        }

        LanesActions.reorder(source.id, newOrder);
    }
};

function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Lane extends Component {
    static propTypes = {
        lane: PropTypes.object.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
        const {connectDragSource, connectDragPreview, connectDropTarget, isDragging} = this.props;
        return connectDropTarget(connectDragPreview(
            <div className="panel panel-primary lane" style={{opacity: isDragging ? 0 : 1}}>
                {connectDragSource(<div className="panel-heading">
                    <h3 className="panel-title">
                        <Editable val={this.props.lane.name}
                                  onSave={this._onNameUpdate}/>
                    </h3>
                </div>)}
                <div className="panel-body">
                    <NoteForm laneId={this.props.lane.id}/>
                    <NotesList laneId={this.props.lane.id}/>
                </div>
            </div>
        ));
    }

    _onNameUpdate = (name) => {
        var lane = this.props.lane;
        LanesActions.update(lane.id, lane.order, name);
        this.setState({editing: false});
    };
}

export default flow(
    DragSource(ItemTypes.LANE, laneSource, collectSource),
    DropTarget(ItemTypes.LANE, laneTarget, collectTarget)
)(Lane);

// TODO: fix update after reorder bug