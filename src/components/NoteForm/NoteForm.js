import React, { Component } from 'react'
import NotesActions from '../../actions/NotesActions'

export default class NoteForm extends Component {

    constructor(props) {
        super(props);
        this.state = {val: ''}
    }

    render = () => {
        return (
            <div className="note-form">
                <input className="form-control input-lg"
                       type="text"
                       placeholder="What's next?"
                       autoFocus={true}
                       value={this.state.val}
                       onChange={this._onChange}
                       onKeyDown={this._onKeyDown}/>
            </div>
        );
    };

    _onSave = (val) => {
        NotesActions.create(val);
    };

    _onChange = (e) => {
        this.setState({val: e.target.value});
    };

    _onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this._onSave(e.target.value);
            this.setState({val: ''});
        }
    }

}