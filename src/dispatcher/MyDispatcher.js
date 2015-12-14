export default {

    callbacks: {},

    register: function (callback, actionType) {
        if (!this.callbacks[actionType]) {
            this.callbacks[actionType] = [];
        }
        this.callbacks[actionType].push(callback);
    },

    update: function (actionTypes) {
        actionTypes.forEach(aT => {
            if (this.callbacks[aT]) {
                this.callbacks[aT].forEach(c => c());
            }
        });
    }

};