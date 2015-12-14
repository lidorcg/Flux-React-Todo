import TodoStore from '../stores/TodoStore';
import TodoConstants from '../constants/TodoConstants';
import Dispatcher from '../dispatcher/MyDispatcher';

export default {
    create: function (text) {
        TodoStore.create(text);
        Dispatcher.update([TodoConstants.CREATE, TodoConstants.CHANGE]);
    },

    getAll: function () {
        Dispatcher.update([TodoConstants.READ]);
        return TodoStore.getAll();
    },

    update: function (id, text) {
        TodoStore.update(id, text);
        Dispatcher.update([TodoConstants.UPDATE, TodoConstants.CHANGE]);
    },

    destroy: function (id) {
        TodoStore.destroy(id);
        Dispatcher.update([TodoConstants.DESTROY, TodoConstants.CHANGE]);
    }
};