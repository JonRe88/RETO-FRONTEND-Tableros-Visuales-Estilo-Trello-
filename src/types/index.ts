export interface User {
  id: string;
  email: string;
  password: string;
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
  isFavorite: boolean;
  isArchived: boolean;
  lastModified: number;
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
  userId: string;
  createdAt: number;
}