import React, { Component } from 'react'
import TodoActions from '../../actions/TodoActions'

export default class TodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {val: ''}
    }

    render = () => {
        return (
            <div className="todo-form">
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
        TodoActions.create(val);
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