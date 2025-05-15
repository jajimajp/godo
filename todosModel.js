class TodosModel {
  constructor() {
    this.todos = [] // { id, title, completed } の配列
    this.nextId = 1 // 次に追加する Todo の id
  }

  // 全ての Todo の配列を返す
  list() {
    return this.todos
  }

  // 名前が title の Todo を新たに追加して、追加した Todo を返す
  add(title) {
    const newTodo = { title, id: this.nextId, completed: false }
    this.todos.push(newTodo)
    this.nextId += 1

    return newTodo
  }

  // 指定された id の Todo を完了済みにする
  complete(id) {
    const todo = this.todos.find((todo) => todo.id === id)
    if (todo) { todo.completed = true }
  }
}

module.exports = { TodosModel }

