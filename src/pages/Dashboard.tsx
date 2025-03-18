import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useBoardStore } from '../store/boards';
import { Plus, Star, Layout, ListTodo, Clock, Archive } from 'lucide-react';


export default function Dashboard() {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const { boards, createBoard, deleteBoard } = useBoardStore();


  const userBoards = boards.filter((board) => board.userId === user?.id);

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim() && user) {
      createBoard(newBoardTitle.trim(), user.id);
      setNewBoardTitle('');
      setShowNewBoardInput(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="space-y-4">
            {/* Workspace Section */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Espacio de Trabajo
              </h2>
              <nav className="space-y-1">
                <Link
                  to="/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200"
                >
                  <Layout className="mr-3 h-5 w-5" />
                  Tableros
                </Link>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Star className="mr-3 h-5 w-5 text-yellow-500" />
                  Favoritos
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Clock className="mr-3 h-5 w-5 text-blue-500" />
                  Recientes
                </a>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Archive className="mr-3 h-5 w-5 text-purple-500" />
                  Archivados
                </a>
              </nav>
            </div>

            {/* My Boards Section */}
            <div>
              <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Mis Tableros
              </h2>
              <nav className="space-y-1">
                {userBoards.map((board) => (
                  <Link
                    key={board.id}
                    to={`/board/${board.id}`}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <ListTodo className="mr-3 h-5 w-5 text-green-500" />
                    {board.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* New Board Button/Form */}
            <div className="h-48 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 flex flex-col items-center justify-center">
              {showNewBoardInput ? (
                <form onSubmit={handleCreateBoard} className="w-full">
                  <input
                    type="text"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    placeholder="Ingrese Titulo del Tablero"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                    autoFocus
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowNewBoardInput(false)}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                      Crear
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowNewBoardInput(true)}
                  className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  <Plus className="h-12 w-12 mb-2" />
                  <span className="text-sm font-medium">Crear Nuevo Tablero</span>
                </button>
              )}
            </div>

            {/* Existing Boards */}
            {userBoards.map((board) => (
              <div
                key={board.id}
                className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-800 rounded-lg shadow-md p-6 flex flex-col text-white"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{board.title}</h3>
                  <button
                    onClick={() => deleteBoard(board.id)}
                    className="text-white/70 hover:text-white/100"
                  >
                    <Archive className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-white/70 mb-4">
                  {board.lists.length} listas ·{' '}
                  {board.lists.reduce((acc, list) => acc + list.tasks.length, 0)}{' '}
                  tareas
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/board/${board.id}`}
                    className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                  >
                    Abrir Tablero
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}