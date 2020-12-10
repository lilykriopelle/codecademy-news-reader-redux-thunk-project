import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAllPreviews = createAsyncThunk(
  "articlePreviews/loadAllPreviews",
  async () => {
    const data = await fetch("api/articles");
    const json = await data.json(); // WHY DOES THIS LINE ERROR
    return json;
  }
);

export const articlePreviewsSlice = createSlice({
  name: "articlePreviews",
  initialState: {
    articles: [],
    isLoading: false,
    hasError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllPreviews.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadAllPreviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.articles = action.payload;
      })
      .addCase(loadAllPreviews.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.articles = [];
      })
  },
});

export const selectAllPreviews = (state) => state.articlePreviews.articles;

export default articlePreviewsSlice.reducer;
