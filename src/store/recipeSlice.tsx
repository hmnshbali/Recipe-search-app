import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch recipes from The Meal DB API
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
 async (query: string) => {
    let response;
    if (query && query.trim() !== '') {
      response = await axios.get(`https://dummyjson.com/recipes/search?q=${query}`);
      return response.data.recipes || [];
    } else {
      response = await axios.get('https://dummyjson.com/recipes');
      return response.data.recipes || [];
    }
  }
);

interface Recipe {
  idMeal: string; // Changed to match the API response
  strMeal: string;
  strInstructions: string;
  strIngredients: string; // This may need to be adjusted based on how you want to handle ingredients
  // Add other fields as needed
}

interface RecipesState {
  recipes: Recipe[] | null; // Allowing null in case there are no meals found
  isLoading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: null,
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload; // Updating with fetched meals
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export default recipesSlice.reducer;
