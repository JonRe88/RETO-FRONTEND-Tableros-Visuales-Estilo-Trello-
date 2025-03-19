import { Link, useLocation } from 'react-router-dom';
import { Layout, Star, Clock, Archive, Home, LayoutDashboard, Settings } from 'lucide-react';
import logo from '../assets/images/tskapp.png';

export const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="font-semibold text-gray-900 dark:text-white">TaskApp</span>
        </Link>

        {/* Workspace Section */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Espacio de Trabajo
          </h2>
          <nav className="space-y-1">
            <Link
              to="/boards"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/boards')
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Layout className="mr-3 h-5 w-5" />
              Tableros
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/favorites')
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Star className="mr-3 h-5 w-5 text-yellow-500" />
              Favoritos
            </Link>
            <Link
              to="/recent"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/recent')
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Clock className="mr-3 h-5 w-5 text-blue-500" />
              Recientes
            </Link>
            <Link
              to="/archived"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                isActive('/archived')
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Archive className="mr-3 h-5 w-5 text-purple-500" />
              Archivados
            </Link>
          </nav>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-lg text-sm ${
              isActive('/')
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Inicio
          </Link>
          <Link
            to="/boards"
            className={`flex items-center px-3 py-2 rounded-lg text-sm ${
              isActive('/boards')
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Tableros
          </Link>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button className="flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
          <Settings className="h-5 w-5" />
          Configuración
        </button>
      </div>
    </div>
  );
};