import TodoConstants from '../constants/TodoConstants';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function (text) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.CREATE,
            text: text
        });
    },

    update: function (id, text) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.UPDATE,
            id: id,
            text: text
        });
    },

    destroy: function (id) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.DESTROY,
            id: id
        });
    }
};