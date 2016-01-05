import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function () {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_LANE
        });
    },

    update: function (id, order, name) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.UPDATE_LANE,
            id: id,
            order: order,
            text: name
        });
    },

    destroy: function (id) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.DESTROY_LANE,
            id: id
        });
    },

    reorder: function (id, newPlace) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.REORDER_LANES,
            id: id,
            newPlace: newPlace
        });
    }
};