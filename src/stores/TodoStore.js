import TodoDB from '../db/TodoDB';
import shortid from 'shortid';

var TodoList = TodoDB.get('TodoStore');

export default {

    create: function (text) {
        var id = shortid.generate();
        TodoList[id] = {
            id: id,
            text: text
        };
        TodoDB.set('TodoStore', TodoList);
    },

    getAll: function () {
        var allTodo = [];
        for (var i in TodoList) {
            allTodo.push(TodoList[i]);
        }
        return allTodo;
    },

    update: function (id, text) {
        TodoList[id].text = text;
        TodoDB.set('TodoStore', TodoList);
    },

    destroy: function (id) {
        delete TodoList[id];
        TodoDB.set('TodoStore', TodoList);
    }

};