import shortid from 'shortid'
import utils from '../utils/StoresUtils'
import localStorage from '../utils/LocalStorage'
import ActionTypes from '../constants/ActionTypes'
import Dispatcher from '../dispatcher/MyDispatcher'


var lanesCollection = localStorage.get('LanesStore');
if(lanesCollection === null) {
    lanesCollection = {};
}

function getLanesListByOrder() {
    var lanesList = utils.collectionToList(lanesCollection);
    lanesList.sort(utils.compareByOrder);
    return lanesList;
}

function reorderLanes() {
    var lanesList = getLanesListByOrder();
    for (var i in lanesList) {
        lanesList[i].order = i;
        lanesCollection[lanesList[i].id].order = i;
    }
}

/************************/
/* actions on the store */
/************************/

function create() {
    var id = shortid.generate();
    var order = utils.getSize(lanesCollection);
    lanesCollection[id] = {
        id: id,
        order: order,
        name: "New List"
    };
    localStorage.set('LanesStore', lanesCollection);
}

function update(id, order, name) {
    lanesCollection[id].order = order;
    lanesCollection[id].name = name;
    localStorage.set('LanesStore', lanesCollection);
}

function destroy(id) {
    delete lanesCollection[id];
    localStorage.set('LanesStore', lanesCollection);
}

function reorder(id, newPlace) {
    // move note to new place
    lanesCollection[id].order = newPlace;

    // fix orders in lanes
    reorderLanes();

    localStorage.set('LanesStore', lanesCollection);
}

/*************/
/* callbacks */
/*************/

var _callbacks = [];

function emitChange() {
    _callbacks.forEach(c => c());
}

var LaneStore = {

    /***************************/
    /* Components interactions */
    /***************************/

    getAll: function () {
        return getLanesListByOrder();
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

        switch (action.actionType){
            case ActionTypes.CREATE_LANE:
                create();
                emitChange();
                break;
            case ActionTypes.UPDATE_LANE:
                if (action.name != '') {
                    update(action.id, action.order, action.name);
                    emitChange();
                }
                break;
            case ActionTypes.DESTROY_LANE:
                destroy(action.id);
                emitChange();
                break;
            case ActionTypes.REORDER_LANES:
                reorder(action.id, action.newPlace);
                emitChange();
                break;
        }
    })
};

export default LaneStore;