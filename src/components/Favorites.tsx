import React from 'react';
import { useBoardStore } from '../store/boardStore';
import { List } from './List';

export const Favorites = () => {
  const getFavoriteLists = useBoardStore((state) => state.getFavoriteLists);
  const favoriteLists = getFavoriteLists();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Listas Favoritas</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteLists.map((list) => (
          <div key={list.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">{list.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {list.tasks.length} tareas · {list.tasks.filter(t => t.completed).length} completadas
            </p>
          </div>
        ))}
        
        {favoriteLists.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 col-span-3 text-center py-8">
            No hay listas favoritas para mostrar
          </p>
        )}
      </div>
    </div>
  );
};