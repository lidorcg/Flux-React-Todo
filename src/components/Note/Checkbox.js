import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Checkbox extends Component {

    static propTypes = {
        status: React.PropTypes.bool.isRequired,
        onStatusChange: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        var checkBox = $(ReactDOM.findDOMNode(this));
        checkBox.iCheck({checkboxClass: 'icheckbox_flat-blue'});
        checkBox.on('ifChanged', this.props.onStatusChange);
        this.props.status ? checkBox.iCheck('check') : checkBox.iCheck('uncheck');
    }

    componentDidUpdate(prevProps, prevState) {
        var checkBox = $(ReactDOM.findDOMNode(this));
        this.props.status ? checkBox.iCheck('check') : checkBox.iCheck('uncheck');
    }

    render() {
        return (<input type="checkbox"/>);
    }
}