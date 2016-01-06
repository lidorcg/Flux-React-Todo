import React, { Component } from 'react'
import LanesStore from '../../stores/LanesStore'
import LanesActions from '../../actions/LanesActions'
import Lane from '../Lane/Lane'

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
                <div className="col-md-2">
                    <button type="button"
                            className="btn btn-block"
                            onClick={this._onCreate}>New Lane
                    </button>
                </div>
                {this.state.lanesList.map(this._renderLane)}
            </div>
        );
    }

    _renderLane = (item, i) => {
        return (
            <div key={i} className="col-md-5 lanes-list">
                <Lane lane={item}/>
            </div>
        );
    };

    _updateLanesList = () => {
        this.setState({lanesList: LanesStore.getAll()});
    };

    _onCreate = () => {
        LanesActions.create();
    };

}