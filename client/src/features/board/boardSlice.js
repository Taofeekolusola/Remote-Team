// src/features/board/boardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithToken from '../../api/axiosWithToken';

// Create Board
export const createBoard = createAsyncThunk(
  'board/createBoard',
  async ({ projectId, name }, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().post(`/boards/${projectId}`, { name });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Add Column to Board
export const addColumn = createAsyncThunk(
  'board/addColumn',
  async ({ boardId, name, order }, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().post(`/boards/${boardId}/columns`, { name, order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Add Task to Column
export const addTask = createAsyncThunk(
  'board/addTask',
  async ({ columnId, title, description, dueDate }, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().post(`/columns/${columnId}/tasks`, {
        title,
        description,
        dueDate,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Move Task to Another Column
export const moveTask = createAsyncThunk(
  'board/moveTask',
  async ({ taskId, newColumnId, newOrder }, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().put(`/tasks/${taskId}/move`, {
        newColumnId,
        newOrder,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Edit Task
export const editTask = createAsyncThunk(
  'board/editTask',
  async ({ taskId, updates }, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().put(`/tasks/${taskId}/edit`, updates);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  'board/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await axiosWithToken().delete(`/tasks/${taskId}/delete`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get a full board with columns and tasks
export const fetchBoardById = createAsyncThunk(
    'board/fetchBoard',
    async (boardId, { rejectWithValue }) => {
      try {
        const res = await axiosWithToken().get(`/boards/${boardId}`);
        return res.data; // Assume this returns { id, name, columns: [ { id, name, tasks: [...] }, ... ] }
      } catch (err) {
        return rejectWithValue(err.response?.data?.error || err.message);
      }
    }
  );  

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearBoardMessage: (state) => {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.boards.push(action.payload);
        state.message = 'Board created';
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addColumn.fulfilled, (state, action) => {
        const board = state.boards.find((b) => b.id === action.payload.boardId);
        if (board) {
          board.columns = board.columns || [];
          board.columns.push(action.payload);
        }
        state.message = 'Column added';
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.message = 'Task added';
      })

      .addCase(moveTask.fulfilled, (state, action) => {
        state.message = 'Task moved';
      })

      .addCase(editTask.fulfilled, (state, action) => {
        state.message = 'Task edited';
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.message = 'Task deleted';
      })

      .addCase(fetchBoardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearBoardMessage } = boardSlice.actions;
export default boardSlice.reducer;