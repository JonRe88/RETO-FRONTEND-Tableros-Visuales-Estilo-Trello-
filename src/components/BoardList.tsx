import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { useBoardStore } from '../store/boardStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const boardColors = [
  'bg-blue-200 border-blue-300 hover:bg-blue-200',
  'bg-green-200 border-green-300 hover:bg-green-200',
  'bg-purple-200 border-purple-300 hover:bg-purple-200',
  'bg-pink-200 border-pink-300 hover:bg-pink-200',
  'bg-yellow-300 border-yellow-300 hover:bg-yellow-200',
  'bg-orange-300 border-orange-300 hover:bg-orange-200',
  'bg-teal-300 border-teal-300 hover:bg-teal-200',
  'bg-red-300 border-red-300 hover:bg-red-200',
  'bg-indigo-300 border-indigo-300 hover:bg-indigo-200',
];

export const BoardList = () => {
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const { user } = useAuthStore();
  const { boards, createBoard, deleteBoard } = useBoardStore();

  const userBoards = boards.filter((board) => board.userId === user?.id);

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardTitle.trim() || !user) return;

    createBoard(newBoardTitle.trim(), user.id);
    setNewBoardTitle('');
    setShowNewBoardInput(false);
    toast.success('Tablero creado exitosamente');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Mi Pizarrón</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* New Board Button/Form */}
        <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
          {showNewBoardInput ? (
            <form onSubmit={handleCreateBoard} className="space-y-4">
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Nombre del pizarrón"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewBoardInput(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Crear
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowNewBoardInput(true)}
              className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <Plus className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Crear nuevo pizarrón</span>
            </button>
          )}
        </div>

        {/* Existing Boards */}
        {userBoards.map((board, index) => (
          <div
            key={board.id}
            className={`${
              boardColors[index % boardColors.length]
            } border-2 rounded-lg p-6 flex flex-col transition-colors duration-200`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                {board.title}
              </h3>
              <button
                onClick={() => deleteBoard(board.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {board.lists.length} listas · {board.lists.reduce((acc, list) => acc + list.tasks.length, 0)} tareas
            </p>
            <div className="mt-auto">
              <Link
                to={`/board/${board.id}`}
                className="inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-thin bg-indigo-600 hover:bg-indigo-900 transition-colors duration-200"
              >
                Abrir Tablero
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};