import ActionTypes from '../constants/ActionTypes';

var _callbacks = [];

export default {

    register: function (callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1;
    },

    dispatch: function (payload) {
        _callbacks.forEach(c => c(payload));
    },

    handleViewAction: function (action) {
        this.dispatch({
            source: ActionTypes.VIEW_ACTION,
            action: action
        });
    }

};