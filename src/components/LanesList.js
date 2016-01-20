import React, { Component } from 'react'
import LanesStore from '../stores/LanesStore'
import Lane from './Lane'

export default class LanesList extends Component {
    constructor(props) {
        super(props);
        this.state = {lanesList: LanesStore.getAll()};
    }

    componentDidMount() {
        LanesStore.addCallback(this._updateLanesList);
    }

    componentWillUnmount() {
        LanesStore.removeCallback(this._updateLanesList);
    }

    render() {
        return (
            <div className="row">
                {this.state.lanesList.map(this._renderLane)}
            </div>
        );
    }

    _renderLane = (item, i) => {
        return (
            <div key={i} className="col-md-4 lanes-list">
                <Lane lane={item}/>
            </div>
        );
    };

    _updateLanesList = () => {
        this.setState({lanesList: LanesStore.getAll()});
    };


}