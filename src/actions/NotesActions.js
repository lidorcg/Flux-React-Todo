import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function (text) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.CREATE_NOTE,
            text: text
        });
    },

    update: function (id, order, text, status) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.UPDATE_NOTE,
            id: id,
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