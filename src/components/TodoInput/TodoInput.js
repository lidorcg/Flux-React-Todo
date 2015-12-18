import React, { Component } from 'react'

export default class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {val: this.props.val || ''}
    }

    static propTypes = {
        placeHolder: React.PropTypes.string,
        val: React.PropTypes.string,
        onSave: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func
    };

    render = () => {
        return (
            <input className="form-control"
                   type="text"
                   placeholder={this.props.placeHolder || ''}
                   autoFocus={true}
                   value={this.state.val}
                   onChange={this._onChange}
                   onKeyDown={this._onKeyDown}
                   onBlur={this.props.onBlur}/>
        );
    };

    _onChange = (e) => {
        this.setState({val: e.target.value});
    };

    _onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onSave(e.target.value);
            this.setState({val: ''});
        }
    }
}