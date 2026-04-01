import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return (await axiosInstance.get("/services")).data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const connectService = createAsyncThunk(
  "services/connect",
  async ({ service }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post("/services/connect", { service })).data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const disconnectService = createAsyncThunk(
  "services/disconnect",
  async ({ service }, { rejectWithValue }) => {
    try {
      return (await axiosInstance.post("/services/disconnect", { service })).data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchServices
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload.services;
    });

    // connectService
    builder.addCase(connectService.pending, (state, action) => {
      const service = action.meta.arg.service;
      state.loading = service;

      const item = state.services.find(s => s.name === service);
      if (item) item.is_connected = true;
    });
    builder.addCase(connectService.fulfilled, (state, action) => {
      state.loading = null;
      state.services = action.payload.services;
    });
    builder.addCase(connectService.rejected, (state, action) => {
      state.loading = null;
    });

    // disconnectService
    builder.addCase(disconnectService.pending, (state, action) => {
      const service = action.meta.arg.service;
      state.loading = service;

      const item = state.services.find(s => s.name === service);
      if (item) item.is_connected = false;
    });
    builder.addCase(disconnectService.fulfilled, (state, action) => {
      state.loading = null;
      state.services = action.payload.services;
    });
    builder.addCase(disconnectService.rejected, (state, action) => {
      state.loading = null;
    });
  },
});

export default servicesSlice.reducer;