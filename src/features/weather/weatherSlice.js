import { createSlice } from '@reduxjs/toolkit';
import { getWeatherByCity } from '../../helper/apiHelper'

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    value: null,
  },
  reducers: {
    updateWeather: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateWeather } = weatherSlice.actions;

// Thunk to perform async request to the graphql backend
export const updateWeatherAsync = amount => dispatch => {
  getWeatherByCity(amount).then((result) => {
    dispatch(updateWeather(result.data.data.getCityByName))
  });

};

// Redux selector to select the weather value
export const selectWeather = state => state.weather.value;

export default weatherSlice.reducer;
