'use client';

import { useState, useEffect } from 'react';
import TaskForm from './tasks/TaskForm';
import TaskList from './tasks/TaskList';
import { Task, UpdatedTask } from './interface';

export default function HomePage() {
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // useEffect(() => {
  //   setTasks([
  //     {
  //       id: '1',
  //       title: 'Primer tarea',
  //       description: 'Descripción 1',
  //       completed: false,
  //       createdAt: new Date(),
  //     },
  //     {
  //       id: '2',
  //       title: 'Segunda tarea',
  //       description: 'Descripción 2',
  //       completed: true,
  //       createdAt: new Date(),
  //     },
  //   ]);
  // }, []);

  useEffect (() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks`,{});
        if (!res.ok) throw new Error("No se pudieron obtener las tareas");

        const data = await res.json();
        setTasks(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Error al obtener las tareas");
      }
    };

    fetchTasks().then (()=> console.log("ejecuto"));
  }, []);

  const addTask = async () => {
    try {
      if (!newTask.trim()) {
        setError("La tarea no puede estar vacía");
        return;
      }

      const res = await fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, description:'description', completed:false}),
      });

      // const newItem: Task = {
      //   id: Date.now().toString(),
      //   title: newTask,
      //   description: '',
      //   completed: false,
      //   createdAt: new Date(),
      // };

      const newItem= await res.json();
      setTasks(prev => [...prev, newItem]);
      setNewTask('');
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al agregar la tarea");
    }
  };

  const updateTask = async (id: string, data: UpdatedTask) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al actualizar la tarea");

      const updated = await res.json();

      setTasks(prev =>
        prev.map(task => (task.id === id ? updated : task))
      );

      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al actualizar la tarea");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la tarea");

      setTasks(prev => prev.filter(task => task.id !== id));
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al eliminar la tarea");
    }
  };

  return (
    <main style={{ maxWidth: 500, margin: '50px auto' }}>
      <h1>Lista de Tareas</h1>

      {error && (
        <p style={{ color: "oklch(0.5853 0.2023 29.23)", marginBottom: 10 }}>
          ⚠️ {error}
        </p>
      )}

      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />

      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </main>
  );
}
