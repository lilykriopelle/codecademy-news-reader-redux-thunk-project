import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteCommentForArticle,
  getArticleComments,
  postCommentForArticle,
} from "../../mocks/handlers";

export const loadCommentsForArticleId = createAsyncThunk(
  "comments/loadCommentsForArticleId",
  async (articleId) => getArticleComments(articleId)
);

export const postCommentForArticleId = createAsyncThunk(
  "comments/postCommentForArticleId",
  async ({ articleId, comment }) => postCommentForArticle(articleId, comment)
);

export const deleteCommentForArticleId = createAsyncThunk(
  "comments/deleteCommentForArticleId",
  async ({ articleId, commentId }) =>
    deleteCommentForArticle(articleId, commentId)
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
      .addCase(loadCommentsForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })
      .addCase(postCommentForArticleId.pending, (state) => {
        state.createCommentIsPending = true;
        state.failedToCreateComment = false;
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = false;
        const { articleId } = action.payload;
        state.byArticleId[articleId].push(action.payload);
      })
      .addCase(postCommentForArticleId.rejected, (state) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = true;
      })
      .addCase(deleteCommentForArticleId.pending, (state) => {
        console.log("loading");
        state.isLoadingComments = true;
      })
      .addCase(deleteCommentForArticleId.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        console.log("fufilled", action);
        state.byArticleId[action.meta.arg.articleId] = action.payload;
      })
      .addCase(deleteCommentForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      });
  },
});

export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;
