function TodoController(TodoService) {
  var ctrl = this;
  this.newTodo = '';
  this.list = [];

  function getTodos() {
    TodoService
      .retrieve()
      .then(function(response) {
        ctrl.list = response;
      });
  }

  ctrl.updateTodo = function(item, index) {
    if (!item.title) {
      ctrl.removeTodo(item, index);
      return;
    }
    TodoService
      .update(item);
  }

  ctrl.addTodo = function() {
    if (!ctrl.newTodo) {
      return;
    }
    TodoService
      .create({
        title: ctrl.newTodo,
        completed: false
      })
      .then(function(response) {
        ctrl.list.unshift(response);
        ctrl.newTodo = '';
      });
  }

  ctrl.removeTodo = function(item, index) {
    TodoService
      .remove(item)
      .then(function(response) {
        ctrl.list.splice(index, 1);
      });
  }

  ctrl.getRemaining = () => ctrl.list.filter( item => !item.completed );

  ctrl.toggleState = function(item) {
    TodoService
      .update(item)
      .then(function(response) {
        // do nothing
      }, function() {
        // something went wrong on the server, revert change
        item.completed = !item.completed;
      });
  }

  getTodos();
}

angular
  .module('app')
  .controller('TodoController', ['TodoService', TodoController]);
