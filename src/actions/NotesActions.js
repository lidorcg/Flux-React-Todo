import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function (laneId, text) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_NOTE,
            laneId: laneId,
            text: text
        });
    },

    update: function (id, laneId, order, text, status) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.UPDATE_NOTE,
            id: id,
            laneId: laneId,
            order: order,
            text: text,
            status: status
        });
    },

    destroy: function (id) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.DESTROY_NOTE,
            id: id
        });
    },

    reorder: function (id, newPlace) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.REORDER_NOTES,
            id: id,
            newPlace: newPlace
        });
    }
};