import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";


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
  async ({ service }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/services/connect", { service });
      return { service, data: response.data };
    } catch (err) {
     
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const disconnectService = createAsyncThunk(
  "services/disconnect",
  async ({ service }, { rejectWithValue }) => {
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
      const { service, data } = action.payload;
      state.loadingServices[service] = false;
      if (data.services) {
        state.services = { ...state.services, ...data.services };
      }
      toast.success(data.message || `${service} connected successfully`);
    });
    builder.addCase(connectService.rejected, (state, action) => {
      state.loadingServices[action.meta.arg.service] = false;
      toast.error(action.payload?.message || `Failed to connect ${action.meta.arg.service}`);
    });

    builder.addCase(disconnectService.pending, (state, action) => {
      state.loadingServices[action.meta.arg.service] = true;
    });
    builder.addCase(disconnectService.fulfilled, (state, action) => {
      const { service, data } = action.payload;
      state.loadingServices[service] = false;
      if (data.services) {
        state.services = { ...state.services, ...data.services };
      }
      toast.info(data.message || `${service} disconnected`);
    });
    builder.addCase(disconnectService.rejected, (state, action) => {
      state.loadingServices[action.meta.arg.service] = false;
      toast.error(action.payload?.message || `Failed to disconnect ${action.meta.arg.service}`);
    });
  },
});

export default servicesSlice.reducer;