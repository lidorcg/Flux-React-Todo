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
            name: name
        });
    },

    destroy: function (id) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.DESTROY_LANE,
            id: id
        });
    },

    reorder: function (sourceId, targetId) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.REORDER_LANES,
            sourceId: sourceId,
            targetId: targetId
        });
    }
};