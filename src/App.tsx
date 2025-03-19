import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BoardList } from './components/BoardList';
import { BoardView } from './components/BoardView';
import { Recent } from './components/Recent';
import { Favorites } from './components/Favorites';
import { Archived } from './components/Archived';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {user && <Sidebar />}
        <div className={`${user ? 'ml-64' : ''}`}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/boards" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/boards" />} />
              <Route path="/boards" element={user ? <BoardList /> : <Navigate to="/login" />} />
              <Route path="/board/:boardId" element={user ? <BoardView /> : <Navigate to="/login" />} />
              <Route path="/recent" element={user ? <Recent /> : <Navigate to="/login" />} />
              <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
              <Route path="/archived" element={user ? <Archived /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;