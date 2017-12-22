function TodoController() {
  this.newTodo = '';

  this.list = [{
    title: 'First todo item!',
    completed: true
  }, {
    title: 'Second todo item!',
    completed: false
  }, {
    title: 'Third todo item!',
    completed: false
  }];

  this.addTodo = function() {
    this.list.push({
      title: this.newTodo,
      completed: false
    });
    this.newTodo = '';
  }

  this.removeTodo = function(item, index) {
    this.list.splice(index, 1);
  }

  this.getRemaining = () => this.list.filter( item => !item.completed );
}

angular
  .module('app')
  .controller('TodoController', TodoController);
