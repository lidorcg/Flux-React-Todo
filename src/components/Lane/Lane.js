import React, { Component } from 'react'
import NoteForm from '../NoteForm/NoteForm'
import NotesList from '../NotesList/NotesList'

export default class Lane extends Component {
    render = () => {
        return (
        <div className="panel panel-default lane">
            <div className="panel-body">
                <NoteForm />
                <NotesList />
            </div>
        </div>
        );
    }
}