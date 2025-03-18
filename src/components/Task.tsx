import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task as TaskType } from '../types';
import { useBoardStore } from '../store/boards';
import { Trash2, CheckSquare, Square } from 'lucide-react';

interface TaskProps {
  task: TaskType;
  listId?: string;
  boardId?: string;
  className?: string;
}

export default function Task({ task, listId, boardId, className = '' }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const { updateTask, deleteTask } = useBoardStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
      listId,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = () => {
    if (boardId && listId && title.trim() !== task.title) {
      updateTask(boardId, listId, task.id, { title: title.trim() });
    }
    setIsEditing(false);
  };

  const toggleComplete = () => {
    if (boardId && listId) {
      updateTask(boardId, listId, task.id, { completed: !task.completed });
    }
  };

  if (!listId || !boardId) {
    return (
      <div className={`bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm ${className}`}>
        <p className="text-gray-900 dark:text-white">{task.title}</p>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 rounded-md shadow-sm hover:shadow-md transition-shadow border ${className}`}
    >
      <div className="flex items-start gap-2">
        <button
          onClick={toggleComplete}
          className="flex-shrink-0 mt-1 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          {task.completed ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4" />
          )}
        </button>
        
        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-700 dark:text-white"
              autoFocus
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className={`text-sm ${
                task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'
              }`}
            >
              {task.title}
            </p>
          )}
        </div>

        <button
          onClick={() => deleteTask(boardId, listId, task.id)}
          className="flex-shrink-0 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}