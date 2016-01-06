import shortid from 'shortid'
import utils from '../utils/StoresUtils'
import localStorage from '../utils/LocalStorage'
import ActionTypes from '../constants/ActionTypes'
import Dispatcher from '../dispatcher/MyDispatcher'

var notesCollection = localStorage.get('NotesStore');
if(notesCollection === null) {
    notesCollection = {};
}

function getNotesListByLane(laneId) {
    var notesList = utils.collectionToList(notesCollection);
    notesList = notesList.filter((item) => { return item.laneId === laneId });
    notesList.sort(utils.compareByOrder);
    return notesList;
}

function reorderLane(laneId) {
    var notesList = getNotesListByLane(laneId);
    for (var i in notesList) {
        notesList[i].order = i;
        notesCollection[notesList[i].id].order = i;
    }
}

/* setters and functions that change data are outside the store!
 * we want to force unidirectional data flow:
 * actions => store => view-controller */
function create(laneId, text) {
    var id = shortid.generate();
    var order = utils.getSize(notesCollection);
    notesCollection[id] = {
        id: id,
        laneId: laneId,
        order: order,
        text: text,
        status: false
    };
    localStorage.set('NotesStore', notesCollection);
}

function update(id, laneId, order, text, status) {
    notesCollection[id].order = order;
    notesCollection[id].laneId = laneId;
    notesCollection[id].text = text;
    notesCollection[id].status = status;
    localStorage.set('NotesStore', notesCollection);
}

function destroy(id) {
    delete notesCollection[id];
    localStorage.set('NotesStore', notesCollection);
}

function reorder(id, newPlace) {
    // set everything
    var newLane = newPlace.laneId;
    var oldLane = notesCollection[id].laneId;

    // move note to new place
    notesCollection[id].laneId = newLane;
    notesCollection[id].order = newPlace.order;

    // fix orders in lanes
    reorderLane(id, oldLane);
    if (oldLane !== newLane) {
        reorderLane(newLane);
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

    getByLane: function (laneId) {
        return getNotesListByLane(laneId);
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
                    create(action.laneId, action.text);
                    emitChange();
                }
                break;
            case ActionTypes.UPDATE_NOTE:
                if (action.text != '') {
                    update(action.id, action.laneId, action.order, action.text, action.status);
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