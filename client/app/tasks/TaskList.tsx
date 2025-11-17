'use client';

import TaskItem from './TaskItem';
import { Task, UpdatedTask } from '../interface';

interface Props {
  tasks: Task[];
  updateTask: (id: string, data:UpdatedTask) => void;
  deleteTask: (id: string) => void;
}

export default function TaskList({ tasks, updateTask, deleteTask }: Props) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}
