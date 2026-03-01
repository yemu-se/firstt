import { useState, useEffect } from 'react'
import './App.css'
import TaskInput from './components/TaskInput'
import EditTask from './components/EditTask'
import TaskCategories from './components/TaskCategories'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md"
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTasks = (text, category) => {
    if (text.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: text,
      category: category,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplet = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  function deletTasks(indexTODelete) {
    const upDateTasks = tasks.filter((task) => task.id !== indexTODelete);
    setTasks(upDateTasks)
  }

  const [editingId, setEditingId] = useState("");
  const saveEdit = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
    setEditingId("");
  };

  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }
    , [darkMode]);

  const activeTask = tasks.filter(task => !task.completed).length;
  let statusMessage;
  if (tasks.length === 0 || activeTask === 0) {
    statusMessage = "Enjoy your free time! No tasks.";
  }
  else {
    statusMessage = `You have ${activeTask} tasks`
  }

  return (
    <div className='main-container'>
      <button className='theme-toggle'
        onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>

      <h1>My Tasks</h1>
      <TaskCategories tasks={tasks} />
      <TaskInput onAdd={addTasks} />
      <ul>
        {tasks.map((task) => {
          const categoryClass = `badge-${task.category?.toLowerCase() || 'default'}`;
          const itemClass = `item-${task.category?.toLowerCase() || 'default'}`;
          return (
            <li key={task.id}
              className={`task-item ${itemClass} ${task.completed ? "completed" : ""}`}
              style={{
                listStyle: 'none',
                margin: '10px 0', fontSize: '1.2rem'
              }}>
              {editingId === task.id ? (
            <EditTask
              task={task}
                  onSave={saveEdit}
                  onCancel={() => setEditingId("")}
            />
          ) : (<>
            <span onClick={() => toggleComplet(task.id)} style={{ cursor: 'pointer' }}>
              {task.text}
              {task.category && (
                <span className={`category-badge ${categoryClass}`}>
                  {task.category}
                </span>
              )}
            </span>
            <div className='action'>
                  <button className='edit-btn' onClick={() => setEditingId(task.id)}><FaEdit /></button>
                  <button className='delet-btn' onClick={() => deletTasks(task.id)}><FaTrashAlt /></button>
            </div>

          </>
          )}

            </li>
          )
        })}
      </ul>
      <p className="task-count">
        {statusMessage}
      </p>
    </div>
  )
}
export default App

