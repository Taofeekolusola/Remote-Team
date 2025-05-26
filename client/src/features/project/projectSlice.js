// src/features/project/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithToken from '../../api/axiosWithToken';

// Create a new project
export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const api = axiosWithToken();
      const res = await api.post('/projects/create', projectData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Assign a user to a project
export const assignUserToProject = createAsyncThunk(
  'project/assignUserToProject',
  async ({ projectId, userId, role }, { rejectWithValue }) => {
    try {
      const api = axiosWithToken();
      const res = await api.post(`/projects/${projectId}/assign`, {
        userId,
        role,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearProjectMessage: (state) => {
      state.message = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.message = 'Project created successfully';
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Assign User
      .addCase(assignUserToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignUserToProject.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(assignUserToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectMessage } = projectSlice.actions;
export default projectSlice.reducer;