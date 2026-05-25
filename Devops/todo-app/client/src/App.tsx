import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
const apiUrl = `${apiBaseUrl}`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/todos`);
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Unable to load todos.');
    }
  }

  async function handleAddTodo() {
    if (!title.trim()) {
      return;
    }

    const response = await fetch(`${apiUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() }),
    });

    if (response.ok) {
      setTitle('');
      fetchTodos();
    } else {
      alert('Unable to add todo.');
    }
  }

  async function handleToggle(todo: Todo) {
    const response = await fetch(`${apiUrl}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    if (response.ok) {
      setTodos((currentTodos) =>
        currentTodos.map((currentTodo) =>
          currentTodo.id === todo.id
            ? { ...currentTodo, completed: !currentTodo.completed }
            : currentTodo,
        ),
      );
    } else {
      alert('Unable to update todo.');
    }
  }

  async function handleDelete(id: number) {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } else {
      alert('Unable to delete todo.');
    }
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Todo App</h1>
      </header>

      <section className="todo-form">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a new todo"
          onKeyDown={(event) => event.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add</button>
      </section>

      {loading && <p>Loading...</p>}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span>{todo.title}</span>
            </label>
            <button
              className="delete-button"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
