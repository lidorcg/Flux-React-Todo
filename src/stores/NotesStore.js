import shortid from 'shortid';
import localStorage from '../local-storage/NotesLocalStorage';
import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/MyDispatcher'


var notesCollection = localStorage.get('NotesStore');

function getNotesCollectionCount() {
    var count = 0;
    for (var i in notesCollection) {
        count++;
    }
    return count;
}

function compareNotes(a, b) {
    if (a.order < b.order)
        return -1;
    if (a.order > b.order)
        return 1;
    return 0;
}

function getNotesListByOrder() {
    var notesList = [];
    for (var i in notesCollection) {
        notesList.push(notesCollection[i]);
    }
    notesList.sort(compareNotes);
    return notesList;
}

/* setters and functions that change data are outside the store!
 * we want to force unidirectional data flow:
 * actions => store => view-controller */
function create(text) {
    var id = shortid.generate();
    var order = getNotesCollectionCount();
    notesCollection[id] = {
        id: id,
        order: order,
        text: text,
        status: false
    };
    localStorage.set('NotesStore', notesCollection);
}

function update(id, order, text, status) {
    notesCollection[id].order = order;
    notesCollection[id].text = text;
    notesCollection[id].status = status;
    localStorage.set('NotesStore', notesCollection);
}

function destroy(id) {
    delete notesCollection[id];
    localStorage.set('NotesStore', notesCollection);
}

function reorder(id, newPlace) {
    notesCollection[id].order = newPlace;
    var notesList = getNotesListByOrder();
    for (var i in notesList) {
        notesList[i].order = i;
        if (notesList[i].id === id) {
            notesCollection[id].order = i;
        }
    }
    localStorage.set('NotesStore', notesCollection);
}

/* callbacks of listeners:
 * component who are interested in this store
 * left callbacks to be called whenever there is a change */
var _callbacks = [];

function emitChange() {
    _callbacks.forEach(c => c());
}

var NotesStore = {

    /***************************/
    /* Components interactions */
    /***************************/

    /* Only Getters inside the store!
     * we want to force unidirectional data flow:
     * actions => store => view-controller
     * components hold stores so if we put create
     * and update here they could use them*/
    getAll: function () {
        return getNotesListByOrder();
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
            case ActionTypes.CREATE_NOTE:
                if (action.text != '') {
                    create(action.text);
                    emitChange();
                }
                break;
            case ActionTypes.UPDATE_NOTE:
                if (action.text != '') {
                    update(action.id, action.order, action.text, action.status);
                    emitChange();
                }
                break;
            case ActionTypes.DESTROY_NOTE:
                destroy(action.id);
                emitChange();
                break;
            case ActionTypes.REORDER_NOTES:
                reorder(action.id, action.newPlace);
                emitChange();
                break;
        }
    })

};

export default NotesStore;