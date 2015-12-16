import React, { Component } from 'react'
const TextField = require('material-ui/lib/text-field');

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
            <TextField floatingLabelText={this.props.placeHolder || ''}
                       autoFocus={true}
                       value={this.state.val}
                       onChange={this._onChange}
                       onEnterKeyDown={this._onEnterKeyDown}
                       onBlur={this.props.onBlur}/>
        );
    };

    _onChange = (e) => {
        this.setState({val: e.target.value});
    };

    _onEnterKeyDown = (e) => {
        this.props.onSave(e.target.value);
        this.setState({val: ''});
    }
}