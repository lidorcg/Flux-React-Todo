import React, { Component } from 'react'

export default class TodoInput extends Component {

    constructor(props) {
        super(props);
        this.state = {val: this.props.val || ''}
    }

    static propTypes = {
        placeHolder: React.PropTypes.string,
        val: React.PropTypes.string,
        onFinish: React.PropTypes.func.isRequired,
        onBlur: React.PropTypes.func
    };

    render() {
        return (
            <div className="todo-input">
                <input className="todo-form"
                       type="text"
                       placeholder={this.props.placeHolder || ''}
                       autoFocus={true}
                       value={this.state.val}
                       onChange={this._onChange}
                       onKeyDown={this._onKeyDown}
                       onBlur={this.props.onBlur}
                />
            </div>
        );
    }

    _onChange = (e) => {
        this.setState({val: e.target.value});
    };

    _onKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.props.onFinish(e.target.value);
            this.setState({val: ''});
        }
    }
}