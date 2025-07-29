import React, { useEffect, useState } from 'react';
import { getTasks, updateTask, deleteTask, createTask } from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
        console.log("Fetched tasks:", response.data);

      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

  const toggleCompleted = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    try {
      console.log('hi')
      await updateTask(id, {title: taskToToggle.title, completed: !taskToToggle.completed});
      
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map((task) => task.id === id ? {...task, title: task.title, completed: !task.completed } : task)
        console.log("✅ Updated inside toggleCompleted:", updatedTasks)
        return updatedTasks;
      })
    } catch (error) {
      console.log("Unable to toggle completed", error);
    }
  }

  const onPressDeleteTask = async (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (!taskToDelete) return;

    try {
      await deleteTask(id);
      // update local state
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.filter(task => task.id !== id);
        console.log("✅ Updated inside setTasks:", updatedTasks);
        return updatedTasks;
      }); 
    } catch (error) {
      console.log("Unable to delete task", error);
    }
  }

  const onCreateTask = async () => {
    try {
      await createTask({title: inputValue, completed: false});
      // update local state
      fetchTasks();
    } catch (error) {
      console.log("Unable to create task", error);
    }
  }

  return (
    <div>
      <h1>My Tasks App</h1>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
              {task.title} {task.completed ? "(Done)" : "(Pending)"}
              <button onClick={() => onPressDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        
      <input
        placeholder='Enter Task'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      ></input>
      <button onClick={() => onCreateTask()}>Add Task</button>
    </div>
  );
}

export default TaskList;
