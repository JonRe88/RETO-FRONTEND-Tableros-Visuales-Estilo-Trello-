import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useBoardStore } from '../store/boards';
import { List as ListType, Task as TaskType } from '../types';
import { ArrowLeft, Plus } from 'lucide-react';
import List from '../components/List';
import Task from '../components/Task';

const listColors = [
  'bg-blue-50 dark:bg-blue-900/30',
  'bg-purple-50 dark:bg-purple-900/30',
  'bg-pink-50 dark:bg-pink-900/30',
  'bg-yellow-50 dark:bg-yellow-900/30',
  'bg-green-50 dark:bg-green-900/30',
  'bg-orange-50 dark:bg-orange-900/30',
  'bg-teal-50 dark:bg-teal-900/30',
  'bg-red-50 dark:bg-red-900/30',
];

export default function Board() {
  const { id: boardId } = useParams<{ id: string }>();

  const [activeTask, setActiveTask] = useState<TaskType | null>(null);
  const [newListTitle, setNewListTitle] = useState('');
  const [showNewListInput, setShowNewListInput] = useState(false);

  const board = useBoardStore((state) =>
    state.boards.find((b) => b.id === boardId)
  );
  const { addList, moveTask } = useBoardStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  if (!board) {
    return <div>Tablero no encontrado</div>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.data.current?.type === 'task') {
      const taskId = active.id as string;
      const fromListId = active.data.current.listId as string;
      const toListId = over.data.current?.listId as string;
      
      if (fromListId !== toListId) {
        moveTask(board.id, fromListId, toListId, taskId);
      }
    }
    
    setActiveTask(null);
  };

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListTitle.trim()) {
      addList(board.id, newListTitle.trim());
      setNewListTitle('');
      setShowNewListInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link
            to="/dashboard"
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{board.title}</h1>
        </div>
      </header>

      <main className="p-6">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <SortableContext
              items={board.lists.map((list) => list.id)}
              strategy={horizontalListSortingStrategy}
            >
              {board.lists.map((list: ListType, index: number) => (
                <List 
                  key={list.id} 
                  boardId={board.id} 
                  list={list}
                  className={listColors[index % listColors.length]}
                />
              ))}
            </SortableContext>

            {/* Add New List */}
            <div className="flex-shrink-0 w-72">
              {showNewListInput ? (
                <form
                  onSubmit={handleCreateList}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="Nombre de la Lista"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                    autoFocus
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewListInput(false)}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Agregar Lista
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowNewListInput(true)}
                  className="w-full h-12 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Agregar Otra Lista
                </button>
              )}
            </div>
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="transform rotate-3">
                <Task task={activeTask} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}