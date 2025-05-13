import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  teams: [],
  loading: false,
  error: null,
};

const API_URL = 'http://localhost:5005/api/teams';

// Thunks for API calls
export const createTeam = createAsyncThunk(
  'team/createTeam',
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, teamData); // API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getTeams = createAsyncThunk(
  'team/getTeams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/teams'); // API URL
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Slice definition
const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams.push(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;