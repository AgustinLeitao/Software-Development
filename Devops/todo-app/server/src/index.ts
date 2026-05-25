import express, { Request, Response } from 'express';
import cors from 'cors';
import { addTodo, deleteTodo, getTodos, updateTodo } from './db';

type TodoPayload = {
  title: string;
  completed: boolean;
};

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }));
app.use(express.json());

app.get('/todos', (_req: Request, res: Response) => {
  res.json(getTodos());
});

app.post(
  '/todos',
  (req: Request<unknown, unknown, TodoPayload>, res: Response) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required.' });
    }

    const todo = addTodo(title.trim());
    res.status(201).json(todo);
  },
);

app.put(
  '/todos/:id',
  (req: Request<{ id: string }, unknown, TodoPayload>, res: Response) => {
    const id = Number(req.params.id);
    const { completed } = req.body;

    if (!Number.isInteger(id) || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Invalid payload.' });
    }

    const todo = updateTodo(id, completed);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    res.json(todo);
  },
);

app.delete('/todos/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  const removed = deleteTodo(id);
  if (!removed) {
    return res.status(404).json({ error: 'Todo not found.' });
  }

  res.status(204).send();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
