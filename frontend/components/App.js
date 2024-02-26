import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true,
  }
  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }
  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })
  setError = (err) => this.setState({ ...this.state, error: err.response.data.message })
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setError)
  }
  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data})
        this.resetForm()
      })
      .catch(this.setError)
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(td => {
          if (td.id !== id) return td
          return res.data.data
        })})
      })
      .catch(this.setError)
  }
  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }
  render() {
    return (
      <div>
        <div id="error">{this.state.error ? "Error:" : "" } {this.state.error}</div>
        <TodoList 
          toggleCompleted={this.toggleCompleted}
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
          todoNameInput={this.state.todoNameInput}
        />
      </div>
    )
  }
}
