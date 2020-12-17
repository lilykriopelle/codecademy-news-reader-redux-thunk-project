import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (articleId) => {
    const data = await fetch(`api/articles/${articleId}/comments`);
    const json = await data.json();
    return json;
  }
);

export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({articleId, comment}) => {
    const data = await fetch(`api/articles/${articleId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment: comment})
    });
    const json = await data.json();
    return json;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForArticleId.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = false;
        const { articleId, comments } = action.payload;
        state.byArticleId[articleId] = comments;
      })
      .addCase(loadCommentsForArticleId.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
        state.comments = {};
      })
      .addCase(postCommentForArticleId.pending, (state, action) => {
        state.createCommentIsPending = true;
        state.failedToCreateComment = false;
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = false;
        const { articleId } = action.payload;
        state.byArticleId[articleId].push(action.payload);
      })
      .addCase(postCommentForArticleId.rejected, (state, action) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = true;
      })
  },
});

export const selectComments = (state) => state.comments.byArticleId;

export default commentsSlice.reducer;
