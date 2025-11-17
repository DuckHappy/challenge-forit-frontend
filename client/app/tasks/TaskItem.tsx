'use client';

import { useState } from 'react';
import { Task, UpdatedTask } from '../interface';


interface Props {
  task: Task;
  updateTask: (id: string, data: UpdatedTask) => void;
  deleteTask: (id: string) => void;
}

export default function TaskItem({ task, updateTask, deleteTask }: Props) {

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
        onChange={() => updateTask(task.id, { ...task, completed: !task.completed })}
      />

      <input type="text" onChange={(event) => updateTask(task.id, { ...task, title: event.target.value })}
        disabled={task.completed}
        defaultValue={task.title}
        style={{
          flex: 1,
          marginLeft: 8,
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      />

      <input type="text" onChange={(event) => updateTask(task.id, { ...task, description: event.target.value })}
        disabled={task.completed}
        defaultValue={task.description}
        style={{
          flex: 1,
          marginLeft: 8,
          textDecoration: task.completed ? 'line-through' : 'none',
        }}
      />



      <button
        onClick={() => deleteTask(task.id)}
        style={{ background: 'none', border: 'none', color: 'red' }}
      >
        ✕
      </button>
    </li>
  );
}
