# News Feed

## To run
Run `npm start` from the root directory.

## Possible learner tasks
* Define thunk action creators:
  * `loadAllPreviews()`
  * `loadCurrentArticle(articleId)`
  * `loadCommentsForArticleId(articleId)`
  * `postCommentForArticle({articleId, comment})`
* Augment `articlePreviewsSlice` with:
  * `extraReducers` for `loadAllPreviews`
  * additional booleans to track loading and error states
* Augment `currentArticleSlice` with:
  * `extraReducers` for `loadCurrentArticle`
  * additional booleans to track loading and error states
* Augment `commentSlice` with:
  * `extraReducers` for `loadCommentsForArticleId`
  * `extraReducers` for `postCommentForArticleId`
  * additional booleans to track loading and error states

* Q/THOUGHT: should the components already take care of rendering the different things response to state changes, since that's more the purview of react than redux, or is it helpful to have learners go through the process so they practice responding to redux state changes in their components? This might also give them some extra appreciation for why we track things like pending states, eg. disabling a submit button while a request is pending to prevent accidentally submitting multiple times.
