import React, { Component, PropTypes } from 'react'

export default class Editable extends Component {

    static propTypes = {
        val: React.PropTypes.string,
        onSave: React.PropTypes.func.isRequired
    };

    state = {
        editing: false,
        val: this.props.val
    };

    render() {
        return (this.state.editing ? this._renderInput() : this._renderText());
    }

    _renderText = () => {
        return (
            <div onClick={this._onClick}>{this.props.val}</div>
        );
    };

    _renderInput = () => {
        return (<input className="form-control input-sm"
                       type="text"
                       autoFocus={true}
                       value={this.state.val}
                       onChange={this._onChange}
                       onKeyDown={this._onKeyDown}
                       onBlur={this._onInputBlur}/>);
    };

    _onClick = () => {
        this.setState({editing: true});
    };

    _onChange = (e) => {
        this.setState({val: e.target.value});
    };

    _onInputBlur = () => {
        this.setState({val: this.props.val, editing: false});
    };

    _onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onSave(e.target.value);
            this.setState({editing: false});
        } else if (e.keyCode === 27) {
            this._onInputBlur();
        }
    }
}