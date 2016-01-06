export default {
    getSize: function (collection) {
        var count = 0;
        for (var i in collection) {
            count++;
        }
        return count;
    },

    collectionToList: function (collection) {
        var list = [];
        for (var i in collection) {
            list.push(collection[i]);
        }
        return list;
    },

    compareByOrder: function (a, b) {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }
}