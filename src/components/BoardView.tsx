import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { Plus, ArrowLeft } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';
import { useAuthStore } from '../store/authStore';
import { List } from './List';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const BoardView = () => {
  const { boardId } = useParams();
  const [newListTitle, setNewListTitle] = useState('');
  const { user } = useAuthStore();
  const { boards, addList, moveTask } = useBoardStore();

  const board = boards.find((b) => b.id === boardId);

  if (!board) {
    return <Navigate to="/boards" replace />;
  }

  if (board.userId !== user?.id) {
    return <Navigate to="/boards" replace />;
  }

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;

    addList(board.id, newListTitle.trim());
    setNewListTitle('');
    toast.success('Lista creada exitosamente');
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(board.id, source.droppableId, destination.droppableId, draggableId);
    toast.success('Tarea movida exitosamente');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6 px-6 py-4">
        <Link
          to="/boards"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold dark:text-white">{board.title}</h2>
      </div>

      <form onSubmit={handleCreateList} className="flex gap-2 mb-6 px-6">
        <input
          type="text"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          placeholder="Nueva lista..."
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Lista
        </button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6 px-6">
          {board.lists.map((list) => (
            <List key={list.id} boardId={board.id} list={list} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};