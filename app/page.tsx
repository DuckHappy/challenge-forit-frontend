'use client';
import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: String,
  completed: boolean;
  createdAt: Date
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  // 🔹 Obtener tareas (por ahora usaremos datos falsos)
  useEffect(() => {
    // Más adelante haremos fetch('/api/tasks')
    setTasks([
      { id: '1', title: 'work',description:'first', completed: true, createdAt: new Date('2025-11-12T18:45:00Z') },
      { id: '2', title: 'Hacer el challenge de ForIT',description:'second', completed: true, createdAt: new Date('2024-11-12T18:45:00Z') },
    ]);
  }, []);

  // 🔹 Agregar una nueva tarea (temporal)
  const handleAdd = () => {
    if (!newTask.trim()) return;
    const newItem = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };
    setTasks((prev) => [...prev, newItem]);
    setNewTask('');
  };

  // 🔹 Marcar como completada
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🔹 Eliminar una tarea
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Lista de Tareas 📝</h1>

      {/* Formulario */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Escribí una tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          Agregar
        </button>
      </div>

      {/* Lista de tareas */}
      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.item}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                ...styles.text,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.delete}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

// 🎨 Estilos inline básicos (simple, sin CSS externo)
const styles: Record<string, React.CSSProperties> = {
  main: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '1rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #000000ff',
    borderRadius: '8px',
  },
  button: {
    padding: '0.5rem 1rem',
    background: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  text: {
    flex: 1,
    marginLeft: '0.5rem',
  },
  delete: {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
};