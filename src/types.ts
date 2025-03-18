export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
  createdAt: number;
  userId: string;
}

export interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (email: string, name: string, password: string) => void;
  logout: () => void;
}

export interface BoardStore {
  boards: Board[];
  createBoard: (title: string, userId: string) => void;
  updateBoard: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
  addList: (boardId: string, title: string) => void;
  updateList: (boardId: string, listId: string, title: string) => void;
  deleteList: (boardId: string, listId: string) => void;
  addTask: (boardId: string, listId: string, title: string) => void;
  updateTask: (boardId: string, listId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (boardId: string, listId: string, taskId: string) => void;
  moveTask: (boardId: string, fromListId: string, toListId: string, taskId: string) => void;
}