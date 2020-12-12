import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCommentsForArticleId = createAsyncThunk(
  "comments/loadCommentsForArticleId",
  async (articleId) => {
    const data = await fetch(`api/articles/${articleId}/comments`);
    const json = await data.json();
    return json;
  }
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    byArticleId: {},
    isLoading: false,
    hasError: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForArticleId.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        const { articleId, comments } = action.payload;
        state.byArticleId[articleId] = comments;
      })
      .addCase(loadCommentsForArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.comments = {};
      })
  },
});

export default commentsSlice.reducer;
