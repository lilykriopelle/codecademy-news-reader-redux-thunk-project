import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getArticle } from "../../mocks/handlers";

export const loadCurrentArticle = createAsyncThunk(
  "currentArticle/loadCurrentArticle",
  async (articleId) => getArticle(articleId)
);

export const currentArticleSlice = createSlice({
  name: 'currentArticle',
  initialState: {
    article: undefined,
    isLoadingCurrentArticle: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentArticle.pending, (state) => {
        state.isLoadingCurrentArticle = true;
        state.hasError = false;
      })
      .addCase(loadCurrentArticle.fulfilled, (state, action) => {
        state.isLoadingCurrentArticle = false;
        state.hasError = false;
        state.article = action.payload;
      })
      .addCase(loadCurrentArticle.rejected, (state) => {
        state.isLoadingCurrentArticle = false;
        state.hasError = true;
        state.article = {};
      })
  },
});

export const selectCurrentArticle = (state) => state.currentArticle.article;
export const isLoadingCurrentArticle = (state) => state.currentArticle.isLoadingCurrentArticle;

export default currentArticleSlice.reducer;
