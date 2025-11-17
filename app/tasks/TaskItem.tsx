'use client';

import { Task } from '../interface';

interface Props {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function TaskItem({ task, toggleTask, deleteTask }: Props) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span
        style={{
          flex: 1,
          marginLeft: 8,
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      >
        {task.title}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        style={{ background: 'none', border: 'none', color: 'red' }}
      >
        ✕
      </button>
    </li>
  );
}
