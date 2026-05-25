import Database from 'better-sqlite3';

const db = new Database('todos.db');

const createTable = `
CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL
);`;

db.exec(createTable);

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
};

export function getTodos(): Todo[] {
  const stmt = db.prepare(
    'SELECT id, title, completed, createdAt FROM todos ORDER BY id DESC',
  );
  return stmt.all().map((row: any) => ({
    ...row,
    completed: Boolean(row.completed),
  }));
}

export function addTodo(title: string): Todo {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(
    'INSERT INTO todos (title, completed, createdAt) VALUES (?, 0, ?)',
  );
  const result = stmt.run(title, createdAt);
  return {
    id: Number(result.lastInsertRowid),
    title,
    completed: false,
    createdAt,
  };
}

export function updateTodo(id: number, completed: boolean): Todo | null {
  const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
  stmt.run(completed ? 1 : 0, id);
  const todo = db
    .prepare('SELECT id, title, completed, createdAt FROM todos WHERE id = ?')
    .get(id) as Todo;
  return todo ? { ...todo, completed: Boolean(todo.completed) } : null;
}

export function deleteTodo(id: number): boolean {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}
