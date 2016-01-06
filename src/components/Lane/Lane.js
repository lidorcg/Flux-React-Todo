import React, { Component, PropTypes } from 'react'
import NoteForm from '../NoteForm/NoteForm'
import NotesList from '../NotesList/NotesList'

export default class Lane extends Component {
    static propTypes = {
        lane: PropTypes.object.isRequired,
        //connectDragSource: PropTypes.func.isRequired,
        //connectDropTarget: PropTypes.func.isRequired,
        //isDragging: PropTypes.bool.isRequired
    };

    render() {
        return (
            <div className="panel panel-default lane">
                <div className="panel-body">
                    <NoteForm laneId={this.props.lane.id}/>
                    <NotesList laneId={this.props.lane.id}/>
                </div>
            </div>
        );
    }
}