import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Trash2, Edit2, Star, Archive } from 'lucide-react';
import { List as ListType, Task } from '../types';
import { useBoardStore } from '../store/boardStore';
import toast from 'react-hot-toast';

interface ListProps {
  boardId: string;
  list: ListType;
}

const taskColors = [
  'bg-blue-100 border-blue-200 hover:bg-blue-200',
  'bg-orange-300 border-orange-300 hover:bg-orange-200',
  'bg-teal-300 border-teal-300 hover:bg-teal-200',
  'bg-green-100 border-green-200 hover:bg-green-200',
  'bg-purple-100 border-purple-200 hover:bg-purple-200',
  'bg-pink-100 border-pink-200 hover:bg-pink-200',
  'bg-yellow-100 border-yellow-200 hover:bg-yellow-200',
  'bg-orange-100 border-orange-200 hover:bg-orange-200',
];

export const List = ({ boardId, list }: ListProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(list.title);
  const { addTask, updateList, deleteList, updateTask, toggleListFavorite, toggleListArchive } = useBoardStore();

  const completedTasks = list.tasks.filter((task) => task.completed).length;
  const progress = list.tasks.length > 0 ? (completedTasks / list.tasks.length) * 100 : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask(boardId, list.id, newTaskTitle.trim());
    setNewTaskTitle('');
    toast.success('Tarea creada exitosamente');
  };

  const handleUpdateList = () => {
    if (!editTitle.trim() || editTitle === list.title) {
      setIsEditing(false);
      return;
    }

    updateList(boardId, list.id, editTitle.trim());
    setIsEditing(false);
    toast.success('Lista actualizada');
  };

  const handleDeleteList = () => {
    deleteList(boardId, list.id);
    toast.success('Lista eliminada');
  };

  const toggleTaskComplete = (task: Task) => {
    updateTask(boardId, list.id, task.id, { completed: !task.completed });
  };

  const handleToggleFavorite = () => {
    toggleListFavorite(boardId, list.id);
    toast.success(list.isFavorite ? 'Eliminado de favoritos' : 'Añadido a favoritos');
  };

  const handleToggleArchive = () => {
    toggleListArchive(boardId, list.id);
    toast.success(list.isArchived ? 'Lista restaurada' : 'Lista archivada');
  };

  return (
    <div className="list-container">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleUpdateList}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdateList()}
              className="px-2 py-1 border rounded dark:bg-gray-500 dark:border-gray-600 dark:text-white"
              autoFocus
            />
          ) : (
            <>
              <h3 className="font-semibold dark:text-white">{list.title}</h3>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFavorite}
            className={`text-gray-500 hover:text-yellow-500 ${list.isFavorite ? 'text-yellow-500' : ''}`}
          >
            <Star className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleArchive}
            className={`text-gray-500 hover:text-purple-500 ${list.isArchived ? 'text-purple-500' : ''}`}
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={handleDeleteList}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
          <div
            className="h-2 bg-green-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {completedTasks} de {list.tasks.length} tareas completadas
        </div>
      </div>

      <form onSubmit={handleCreateTask} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Nueva tarea..."
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            className="bg-indigo-300 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {list.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      taskColors[index % taskColors.length]
                    } border rounded-lg p-3 shadow-sm transition-all ${
                      task.completed ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskComplete(task)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-800 dark:border-gray-600"
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {task.title}
                      </span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};