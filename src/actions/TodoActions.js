import TodoConstants from '../constants/TodoConstants';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function (text) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.CREATE,
            text: text
        });
    },

    update: function (id, text, status) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.UPDATE,
            id: id,
            text: text,
            status: status
        });
    },

    destroy: function (id) {
        Dispatcher.handleViewAction({
            actionType: TodoConstants.DESTROY,
            id: id
        });
    }
};