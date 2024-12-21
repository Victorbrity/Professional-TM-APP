import React, { useState } from 'react';
import { Task } from './types/task';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { CheckSquare } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      },
    ]);
  };

  const toggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">
              {incompleteTasks.length} tasks remaining
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <TaskForm onAddTask={addTask} />

          {incompleteTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h2>
              <TaskList
                tasks={incompleteTasks}
                onToggleComplete={toggleComplete}
                onDeleteTask={deleteTask}
              />
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Tasks</h2>
              <TaskList
                tasks={completedTasks}
                onToggleComplete={toggleComplete}
                onDeleteTask={deleteTask}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;