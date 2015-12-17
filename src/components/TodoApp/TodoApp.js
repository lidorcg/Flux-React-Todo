import React, { Component } from 'react';
import TodoBox from '../TodoBox/TodoBox';

export default class TodoApp extends Component {
    render = () => {
        return (
            <div className="row">
                <TodoBox/>
            </div>
        );
    }
}
