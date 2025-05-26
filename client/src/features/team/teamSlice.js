// src/features/team/teamSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosWithToken from '../../api/axiosWithToken';

export const createTeam = createAsyncThunk(
  'team/createTeam',
  async (teamData, { rejectWithValue }) => {
    try {
      const api = axiosWithToken();
      const response = await api.post('/teams/create', teamData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const inviteMember = createAsyncThunk(
  'team/inviteMember',
  async ({ teamId, userId }, { rejectWithValue }) => {
    try {
      const api = axiosWithToken();
      const response = await api.post(`/teams/${teamId}/invite`, { userId });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


const teamSlice = createSlice({
  name: 'team',
  initialState: {
    team: null,
    loading: false,
    error: null,
    inviteStatus: null,
  },
  reducers: {
    resetInviteStatus(state) {
      state.inviteStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(inviteMember.pending, (state) => {
        state.inviteStatus = 'pending';
        state.error = null;
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        state.inviteStatus = 'success';
      })
      .addCase(inviteMember.rejected, (state, action) => {
        state.inviteStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetInviteStatus } = teamSlice.actions;
export default teamSlice.reducer;