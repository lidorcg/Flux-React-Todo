import React, { Component, PropTypes } from 'react'
import NotesStore from '../stores/NotesStore'
import Note from './Note'

export default class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {notesList: NotesStore.getByLane(this.props.laneId)};
    }

    static propTypes = {
        laneId: PropTypes.string.isRequired
    };

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
            <Note key={i} laneId={this.props.laneId} note={item}/>
        );
    };

    _updateNotesList = () => {
        console.log("Update notes list!");
        this.setState({notesList: NotesStore.getByLane(this.props.laneId)});
    }

}