import React, { Component } from 'react'
import Note from '../Note/Note'
import NotesStore from '../../stores/NotesStore'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class NotesList extends Component {

    constructor(props) {
        super(props);
        this.state = {notesList: NotesStore.getAll()};
    }

    componentDidMount() {
        NotesStore.addCallback(this._updateNotesList);
    }

    componentWillUnmount() {
        NotesStore.removeCallback(this._updateNotesList);
    }

    render() {
        return (
            <table className="table table-hover ">
                <tbody>
                {this.state.notesList.map(this._renderNote)}
                </tbody>
            </table>
        );
    }

    _renderNote = (item, i) => {
        return (
            <Note key={i} note={item}/>
        );
    };

    _updateNotesList = () => {
        this.setState({notesList: NotesStore.getAll()});
    }

}

export default DragDropContext(HTML5Backend)(NotesList);