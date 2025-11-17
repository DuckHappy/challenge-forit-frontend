'use client';

interface Props {
  newTask: string;
  setNewTask: (value: string) => void;
  addTask: () => void;
}

export default function TaskForm({ newTask, setNewTask, addTask }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        style={{ flex: 1, padding: 8 }}
      />
      <button onClick={addTask} style={{ padding: '8px 16px' }}>
        Agregar
      </button>
    </div>
  );
}
