import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LanesActions from '../actions/LanesActions'
import LanesList from './LanesList';

class NotesApp extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-2">
                        <button type="button"
                                className="btn btn-block"
                                onClick={this._onCreateLane}>New Lane
                        </button>
                    </div>
                    <div className="col-md-10">
                        <LanesList />
                    </div>
                </div>
            </div>
        );
    }

    _onCreateLane = () => {
        LanesActions.create();
    };
}

export default DragDropContext(HTML5Backend)(NotesApp);