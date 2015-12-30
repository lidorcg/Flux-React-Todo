import shortid from 'shortid';
import TodoDB from '../db/TodoDB';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/MyDispatcher'


var todoCollection = TodoDB.get('TodoStore');

function getTodoCollectionCount() {
    var count = 0;
    for (var i in todoCollection) {
        count++;
    }
    return count;
}

function compareTodo(a, b) {
    if (a.order < b.order)
        return -1;
    if (a.order > b.order)
        return 1;
    return 0;
}

function getTodoListByOrder() {
    var todoList = [];
    for (var i in todoCollection) {
        todoList.push(todoCollection[i]);
    }
    todoList.sort(compareTodo);
    return todoList;
}

/* setters and functions that change data are outside the store!
 * we want to force unidirectional data flow:
 * actions => store => view-controller */
function create(text) {
    var id = shortid.generate();
    var order = getTodoCollectionCount();
    todoCollection[id] = {
        id: id,
        order: order,
        text: text,
        status: false
    };
    TodoDB.set('TodoStore', todoCollection);
}

function update(id, order, text, status) {
    todoCollection[id].order = order;
    todoCollection[id].text = text;
    todoCollection[id].status = status;
    TodoDB.set('TodoStore', todoCollection);
}

function destroy(id) {
    delete todoCollection[id];
    TodoDB.set('TodoStore', todoCollection);
}

function reorder(id, newPlace) {
    todoCollection[id].order = newPlace;
    var todoList = getTodoListByOrder();
    for (var i in todoList) {
        todoList[i].order = i;
        if (todoList[i].id === id) {
            todoCollection[id].order = i;
        }
    }
    TodoDB.set('TodoStore', todoCollection);
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
        return getTodoListByOrder();
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
            case ActionTypes.CREATE:
                if (action.text != '') {
                    create(action.text);
                    emitChange();
                }
                break;
            case ActionTypes.UPDATE:
                if (action.text != '') {
                    update(action.id, action.order, action.text, action.status);
                    emitChange();
                }
                break;
            case ActionTypes.DESTROY:
                destroy(action.id);
                emitChange();
                break;
            case ActionTypes.REORDER:
                reorder(action.id, action.newPlace);
                emitChange();
                break;
        }
    })

};

export default TodoStore;