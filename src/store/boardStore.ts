import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, List, Task } from '../types';

interface BoardState {
  boards: Board[];
  createBoard: (title: string, userId: string) => void;
  updateBoard: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
  addList: (boardId: string, title: string) => void;
  updateList: (boardId: string, listId: string, title: string) => void;
  deleteList: (boardId: string, listId: string) => void;
  toggleListFavorite: (boardId: string, listId: string) => void;
  toggleListArchive: (boardId: string, listId: string) => void;
  addTask: (boardId: string, listId: string, title: string, description?: string) => void;
  updateTask: (boardId: string, listId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (boardId: string, listId: string, taskId: string) => void;
  moveTask: (boardId: string, sourceListId: string, destinationListId: string, taskId: string) => void;
  getRecentLists: () => List[];
  getFavoriteLists: () => List[];
  getArchivedLists: () => List[];
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: [],
      createBoard: (title, userId) =>
        set((state) => ({
          boards: [
            ...state.boards,
            {
              id: crypto.randomUUID(),
              title,
              lists: [],
              userId,
              createdAt: Date.now(),
            },
          ],
        })),
      updateBoard: (boardId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, title } : board
          ),
        })),
      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
        })),
      addList: (boardId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: [
                    ...board.lists,
                    { 
                      id: crypto.randomUUID(), 
                      title, 
                      tasks: [],
                      isFavorite: false,
                      isArchived: false,
                      lastModified: Date.now()
                    },
                  ],
                }
              : board
          ),
        })),
      updateList: (boardId, listId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId 
                      ? { ...list, title, lastModified: Date.now() } 
                      : list
                  ),
                }
              : board
          ),
        })),
      deleteList: (boardId, listId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.filter((list) => list.id !== listId),
                }
              : board
          ),
        })),
      toggleListFavorite: (boardId, listId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId
                      ? { ...list, isFavorite: !list.isFavorite, lastModified: Date.now() }
                      : list
                  ),
                }
              : board
          ),
        })),
      toggleListArchive: (boardId, listId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId
                      ? { ...list, isArchived: !list.isArchived, lastModified: Date.now() }
                      : list
                  ),
                }
              : board
          ),
        })),
      addTask: (boardId, listId, title, description) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId
                      ? {
                          ...list,
                          tasks: [
                            ...list.tasks,
                            {
                              id: crypto.randomUUID(),
                              title,
                              description,
                              completed: false,
                              createdAt: Date.now(),
                            },
                          ],
                          lastModified: Date.now(),
                        }
                      : list
                  ),
                }
              : board
          ),
        })),
      updateTask: (boardId, listId, taskId, updates) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId
                      ? {
                          ...list,
                          tasks: list.tasks.map((task) =>
                            task.id === taskId ? { ...task, ...updates } : task
                          ),
                          lastModified: Date.now(),
                        }
                      : list
                  ),
                }
              : board
          ),
        })),
      deleteTask: (boardId, listId, taskId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: board.lists.map((list) =>
                    list.id === listId
                      ? {
                          ...list,
                          tasks: list.tasks.filter((task) => task.id !== taskId),
                          lastModified: Date.now(),
                        }
                      : list
                  ),
                }
              : board
          ),
        })),
      moveTask: (boardId, sourceListId, destinationListId, taskId) =>
        set((state) => {
          const board = state.boards.find((b) => b.id === boardId);
          if (!board) return state;

          const sourceList = board.lists.find((l) => l.id === sourceListId);
          const task = sourceList?.tasks.find((t) => t.id === taskId);
          
          if (!sourceList || !task) return state;

          return {
            boards: state.boards.map((board) =>
              board.id === boardId
                ? {
                    ...board,
                    lists: board.lists.map((list) => {
                      if (list.id === sourceListId) {
                        return {
                          ...list,
                          tasks: list.tasks.filter((t) => t.id !== taskId),
                          lastModified: Date.now(),
                        };
                      }
                      if (list.id === destinationListId) {
                        return {
                          ...list,
                          tasks: [...list.tasks, task],
                          lastModified: Date.now(),
                        };
                      }
                      return list;
                    }),
                  }
                : board
            ),
          };
        }),
      getRecentLists: () => {
        const allLists = get().boards.flatMap(board => 
          board.lists.map(list => ({
            ...list,
            boardId: board.id,
            boardTitle: board.title
          }))
        );
        return allLists
          .filter(list => !list.isArchived)
          .sort((a, b) => b.lastModified - a.lastModified)
          .slice(0, 10);
      },
      getFavoriteLists: () => {
        return get().boards.flatMap(board => 
          board.lists.filter(list => list.isFavorite && !list.isArchived)
        );
      },
      getArchivedLists: () => {
        return get().boards.flatMap(board => 
          board.lists.filter(list => list.isArchived)
        );
      },
    }),
    {
      name: 'board-storage',
    }
  )
);