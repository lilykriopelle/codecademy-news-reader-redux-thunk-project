# News Feed

## To run
Run `npm start` from the root directory.

## Possible learner tasks
* Define thunk action creators:
  * `loadAllPreviews()`
  * `loadCurrentArticle(articleId)`
  * `loadCommentsForArticleId(articleId)`
  * `createCommentForArticle(articleId, commentText)`
* Augment `articlePreviewsSlice` with:
  * `extraReducers` for `loadAllPreviews`
  * `isLoading` and `hasError`
* Augment `currentArticleSlice` with:
  * `extraReducers` for `loadCurrentArticle`
  * `isLoading` and `hasError`
* Augment `commentSlice` with:
  * `extraReducers` for `loadCommentsForArticleId`
  * `extraReducers` for `createCommentForArticle`
* Q: should the components already take care of rendering the spinner/error in response to state changes, since that's more the purview of react than redux, or is it helpful to have learners go through the process so they practice responding to redux state changes in their components?
