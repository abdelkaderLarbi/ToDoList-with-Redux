import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from './actions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState({ id: null, text: '' });

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleUpdateTodo = () => {
    if (editingTodo.text.trim() !== '') {
      dispatch(updateTodo(editingTodo.id, editingTodo.text));
      setEditingTodo({ id: null, text: '' });
    }
  };

  const startEditing = (id, text) => {
    setEditingTodo({ id, text });
  };

  return (
    <div className="container">
    <h1>Todo List</h1>
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button" onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
          {editingTodo.id === todo.id ? (
            <>
              <input
                type="text"
                className="form-control"
                value={editingTodo.text}
                onChange={(e) => setEditingTodo({ id: todo.id, text: e.target.value })}
              />
              <button className="btn btn-success btn-sm" onClick={handleUpdateTodo}>Update</button>
            </>
          ) : (
            <>
              {todo.text}
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              <button className="btn btn-info btn-sm" onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};


function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;