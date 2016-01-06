import React, { Component, PropTypes } from 'react'
import NoteForm from '../NoteForm/NoteForm'
import NotesList from '../NotesList/NotesList'

export default class Lane extends Component {
    static propTypes = {
        lane: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="panel panel-primary lane">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.lane.name}</h3>
                </div>
                <div className="panel-body">
                    <NoteForm laneId={this.props.lane.id}/>
                    <NotesList laneId={this.props.lane.id}/>
                </div>
            </div>
        );
    }
}