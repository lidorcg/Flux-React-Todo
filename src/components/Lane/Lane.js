import React, { Component, PropTypes } from 'react'
import LanesActions from '../../actions/LanesActions'
import Editable from '../Editable/Editable'
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
                    <h3 className="panel-title">
                        <Editable val={this.props.lane.name}
                                  onSave={this._onNameUpdate}/>
                    </h3>
                </div>
                <div className="panel-body">
                    <NoteForm laneId={this.props.lane.id}/>
                    <NotesList laneId={this.props.lane.id}/>
                </div>
            </div>
        );
    }

    _onNameUpdate = (name) => {
        var lane = this.props.lane;
        LanesActions.update(lane.id, lane.order, name);
        this.setState({editing: false});
    };
}