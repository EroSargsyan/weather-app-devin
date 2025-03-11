import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IWeatherState } from '../types/types';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const initialState: IWeatherState = {
  currentWeather: null,
  forecast: null,
  selectedDay: 0,
  isLoading: false,
  error: null,
  unit: 'metric',
  city: '',
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, { rejectWithValue, getState }) => {
    try {
      const { weather } = getState() as { weather: IWeatherState };
      const { unit } = weather;

      const currentWeatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`,
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`,
      );

      return {
        currentWeather: currentWeatherResponse.data,
        forecast: forecastResponse.data,
        city,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to fetch weather data');
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedDay: (state, action: PayloadAction<number>) => {
      state.selectedDay = action.payload;
    },
    toggleUnit: (state) => {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
        state.city = action.payload.city;
        state.selectedDay = 0;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedDay, toggleUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
