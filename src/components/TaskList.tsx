import React from 'react';
import { Task } from '../types/task';
import { CheckCircle2, Circle, Clock, Flag } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityColors = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

export default function TaskList({ tasks, onToggleComplete, onDeleteTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg shadow-sm border transition-all ${
            task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
              <div>
                <h3
                  className={`font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : 'No due date'}
                  </span>
                  <span
                    className={`inline-flex items-center text-sm ${
                      priorityColors[task.priority]
                    }`}
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}