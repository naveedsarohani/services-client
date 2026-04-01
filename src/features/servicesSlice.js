import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

// Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/services");
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const connectService = createAsyncThunk(
  "services/connect",
  async ({ service, config }, { rejectWithValue }) => { 
    try {
     
      const response = await axiosInstance.post("/services/connect", { 
        service, 
        config: config 
      });
      return { service, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const disconnectService = createAsyncThunk(
  "services/disconnect",
  async (service, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/services/disconnect", { service });
      return { service, data: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: {},
    loadingServices: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.services = action.payload;
    });

    builder.addCase(connectService.pending, (state, action) => {
      state.loadingServices[action.meta.arg.service] = true;
    });
    builder.addCase(connectService.fulfilled, (state, action) => {
      const { service } = action.payload;
      state.loadingServices[service] = false;

      if (!state.services[service]) state.services[service] = {};
      state.services[service].is_connected = true;
    });
    builder.addCase(connectService.rejected, (state, action) => {
      state.loadingServices[action.meta.arg.service] = false;
    });

    builder.addCase(disconnectService.pending, (state, action) => {
      state.loadingServices[action.meta.arg] = true;
    });
    builder.addCase(disconnectService.fulfilled, (state, action) => {
      const { service } = action.payload;
      state.loadingServices[service] = false;

      if (state.services[service]) state.services[service].is_connected = false;
    });
    builder.addCase(disconnectService.rejected, (state, action) => {
      state.loadingServices[action.meta.arg] = false;
    });
  },
});

export default servicesSlice.reducer;