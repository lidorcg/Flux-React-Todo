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
        const aOrder = Number(a.order);
        const bOrder = Number(b.order);
        if (aOrder < bOrder)
            return -1;
        if (aOrder > bOrder)
            return 1;
        return 0;
    }
}