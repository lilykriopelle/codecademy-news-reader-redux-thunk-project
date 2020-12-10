# News Feed

## To run
Run `npm start` from the root directory.

## Possible learner tasks
* Define thunk action creators:
  * `loadAllPreviews()`
  * `loadCurrentArticle(articleId)`
  * `toggleSave(articleId)`.
* Augment `articlePreviewsSlice` with:
  * `extraReducers` for `loadAllPreviews` and `toggleSave`
  * `isLoading` and `hasError`
* Augment `currentArticleSlice` with:
  * `extraReducers` for loadCurrentArticle
  * `isLoading` and `hasError`
* Q: should the components already take care of rendering the spinner/error in response to state changes, since that's more the purview of react than redux, or is it helpful to have them go through the process so they practice responding to redux state changes in their components?
