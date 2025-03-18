import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List as ListType, Task as TaskType } from '../types';
import { useBoardStore } from '../store/boards';
import { MoreVertical, Plus, Trash2 } from 'lucide-react';
import Task from './Task';

interface ListProps {
  boardId: string;
  list: ListType;
  className?: string;
}

const taskColors = [
  'bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800/50',
  'bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800/50',
  'bg-pink-100 dark:bg-pink-900/50 border-pink-200 dark:border-pink-700 hover:bg-pink-200 dark:hover:bg-pink-800/50',
  'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-200 dark:border-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-800/50',
  'bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-800/50',
  'bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700 hover:bg-orange-200 dark:hover:bg-orange-800/50',
  'bg-teal-100 dark:bg-teal-900/50 border-teal-200 dark:border-teal-700 hover:bg-teal-200 dark:hover:bg-teal-800/50',
  'bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/50',
];

export default function List({ boardId, list, className = '' }: ListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTaskInput, setShowNewTaskInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { addTask, deleteList } = useBoardStore();

  const {
  
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: list.id,
    data: {
      type: 'list',
      list,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(boardId, list.id, newTaskTitle.trim());
      setNewTaskTitle('');
      setShowNewTaskInput(false);
    }
  };

  const completedTasks = list.tasks.filter((task) => task.completed).length;
  const progress = list.tasks.length > 0
    ? (completedTasks / list.tasks.length) * 100
    : 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex-shrink-0 w-72 rounded-lg ${className}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{list.title}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({list.tasks.length})
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    deleteList(boardId, list.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Borrar Lista
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
          <div
            className="h-1 bg-green-500 dark:bg-green-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tasks */}
        <div className="space-y-2 mb-4">
          {list.tasks.map((task: TaskType, index: number) => (
            <Task
              key={task.id}
              task={task}
              listId={list.id}
              boardId={boardId}
              className={taskColors[index % taskColors.length]}
            />
          ))}
        </div>

        {/* Add Task */}
        {showNewTaskInput ? (
          <form onSubmit={handleCreateTask}>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Ingresa Nombre de Tarea"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              autoFocus
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowNewTaskInput(false)}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Agregar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowNewTaskInput(true)}
            className="w-full py-2 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Tarea
          </button>
        )}
      </div>
    </div>
  );
}