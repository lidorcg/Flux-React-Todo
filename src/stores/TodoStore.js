import shortid from 'shortid';
import TodoDB from '../db/TodoDB';
import TodoConstants from '../constants/TodoConstants';
import Dispatcher from '../dispatcher/MyDispatcher'


var TodoList = TodoDB.get('TodoStore');

/* setters and functions that change data are outside the store!
 * we want to force unidirectional data flow:
 * actions => store => view-controller */
function create(text) {
    var id = shortid.generate();
    TodoList[id] = {
        id: id,
        text: text
    };
    TodoDB.set('TodoStore', TodoList);
}

function update(id, text) {
    TodoList[id].text = text;
    TodoDB.set('TodoStore', TodoList);
}

function destroy(id) {
    delete TodoList[id];
    TodoDB.set('TodoStore', TodoList);
}

/* callbacks of listeners:
 * component who are interested in this store
 * left callbacks to be called whenever there is a change */
var _callbacks = [];

function emitChange() {
    _callbacks.forEach(c => c());
}

var TodoStore = {

    /***************************/
    /* Components interactions */
    /***************************/

    /* Only Getters inside the store!
     * we want to force unidirectional data flow:
     * actions => store => view-controller
     * components hold stores so if we put create
     * and update here they could use them*/
    getAll: function () {
        var allTodo = [];
        for (var i in TodoList) {
            allTodo.push(TodoList[i]);
        }
        return allTodo;
    },

    addCallback: function (callback) {
        _callbacks.push(callback);
    },

    removeCallback: function (callback) {
        var i = _callbacks.indexOf(callback);
        if (i != -1) {
            _callbacks.splice(i, 1);
        }
    },

    /***************************/
    /* Dispatcher interactions */
    /***************************/

    dispatcherIndex: Dispatcher.register(function (payload) {
        var action = payload.action;

        switch (action.actionType) {
            case TodoConstants.CREATE:
                if (action.text != '') {
                    create(action.text);
                    emitChange();
                }
                break;
            case TodoConstants.UPDATE:
                if (action.text != '') {
                    update(action.id, action.text);
                    emitChange();
                }
                break;
            case TodoConstants.DESTROY:
                destroy(action.id);
                emitChange();
                break;
        }
    })

};


export default TodoStore;