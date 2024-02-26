import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
      <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleted || !td.completed) return acc.concat(
              <Todo 
                toggleCompleted={this.props.toggleCompleted}
                todo={td}
                key={td.id}
              />
            )
            return acc
          }, [])
        }
      </div>
    )
  }
}
