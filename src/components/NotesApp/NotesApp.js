import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LanesList from '../LanesList/LanesList';

class NotesApp extends Component {
    render = () => {
        return (
            <div className="container">
                <LanesList />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(NotesApp);