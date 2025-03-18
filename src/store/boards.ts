import { create } from 'zustand';
import { BoardStore, Board, Task } from '../types';
import toast from 'react-hot-toast';

const BOARDS_KEY = 'trello_boards';

const getStoredBoards = (): Board[] => {
  const boards = localStorage.getItem(BOARDS_KEY);
  return boards ? JSON.parse(boards) : [];
};

const saveBoards = (boards: Board[]) => {
  localStorage.setItem(BOARDS_KEY, JSON.stringify(boards));
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: getStoredBoards(),

  createBoard: (title: string, userId: string) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      title,
      lists: [],
      createdAt: Date.now(),
      userId,
    };

    set((state) => {
      const newBoards = [...state.boards, newBoard];
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Board created successfully');
  },

  updateBoard: (boardId: string, title: string) => {
    set((state) => {
      const newBoards = state.boards.map(board =>
        board.id === boardId ? { ...board, title } : board
      );
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Board updated');
  },

  deleteBoard: (boardId: string) => {
    set((state) => {
      const newBoards = state.boards.filter(board => board.id !== boardId);
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Board deleted');
  },

  addList: (boardId: string, title: string) => {
    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: [...board.lists, { id: crypto.randomUUID(), title, tasks: [] }]
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('List added');
  },

  updateList: (boardId: string, listId: string, title: string) => {
    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map(list =>
              list.id === listId ? { ...list, title } : list
            )
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('List updated');
  },

  deleteList: (boardId: string, listId: string) => {
    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.filter(list => list.id !== listId)
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('List deleted');
  },

  addTask: (boardId: string, listId: string, title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map(list =>
              list.id === listId
                ? { ...list, tasks: [...list.tasks, newTask] }
                : list
            )
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Task added');
  },

  updateTask: (boardId: string, listId: string, taskId: string, updates: Partial<Task>) => {
    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map(list =>
              list.id === listId
                ? {
                    ...list,
                    tasks: list.tasks.map(task =>
                      task.id === taskId ? { ...task, ...updates } : task
                    )
                  }
                : list
            )
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Task updated');
  },

  deleteTask: (boardId: string, listId: string, taskId: string) => {
    set((state) => {
      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map(list =>
              list.id === listId
                ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
                : list
            )
          };
        }
        return board;
      });
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Task deleted');
  },

  moveTask: (boardId: string, fromListId: string, toListId: string, taskId: string) => {
    set((state) => {
      const board = state.boards.find(b => b.id === boardId);
      if (!board) return state;

      const fromList = board.lists.find(l => l.id === fromListId);
      if (!fromList) return state;

      const task = fromList.tasks.find(t => t.id === taskId);
      if (!task) return state;

      const newBoards = state.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: board.lists.map(list => {
              if (list.id === fromListId) {
                return {
                  ...list,
                  tasks: list.tasks.filter(t => t.id !== taskId)
                };
              }
              if (list.id === toListId) {
                return {
                  ...list,
                  tasks: [...list.tasks, task]
                };
              }
              return list;
            })
          };
        }
        return board;
      });
      
      saveBoards(newBoards);
      return { boards: newBoards };
    });
    
    toast.success('Task moved');
  },
}));