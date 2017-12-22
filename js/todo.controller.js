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

  ctrl.addTodo = function() {
    ctrl.list.push({
      title: ctrl.newTodo,
      completed: false
    });
    ctrl.newTodo = '';
  }

  ctrl.removeTodo = function(item, index) {
    ctrl.list.splice(index, 1);
  }

  ctrl.getRemaining = () => ctrl.list.filter( item => !item.completed );

  getTodos();
}

angular
  .module('app')
  .controller('TodoController', ['TodoService', TodoController]);
