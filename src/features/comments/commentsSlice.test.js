import reducer, {
  loadCommentsForArticleId,
  postCommentForArticleId,
} from "./commentsSlice";
import commentsData from "../../mocks/comments.json";

beforeAll(() => jest.spyOn(window, "fetch"));

describe("commentsSlice", () => {
  const initialState = {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
  };

  it("should load comments", async () => {
    window.fetch.mockResolvedValueOnce({
      json: async () => ({
        articleId: commentsData[1].articleId,
        comments: commentsData.filter(
          (comment) => comment.articleId === commentsData[1].articleId
        ),
      }),
    });

    const actionCreator = loadCommentsForArticleId();
    const action = await actionCreator(jest.fn(), initialState);
    const nextState = await reducer(initialState, action);

    expect(nextState).toEqual({
      byArticleId: {
        5: commentsData.filter(
          (comment) => comment.articleId === commentsData[1].articleId
        ),
      },
      isLoadingComments: false,
      failedToLoadComments: false,
      createCommentIsPending: false,
      failedToCreateComment: false,
    });
  });

  it("should handle an API error", async () => {
    window.fetch.mockRejectedValueOnce({});

    const actionCreator = loadCommentsForArticleId();
    const action = await actionCreator(jest.fn(), initialState);
    const nextState = await reducer(initialState, action);

    expect(nextState).toEqual({
      byArticleId: {},
      isLoadingComments: false,
      failedToLoadComments: true,
      createCommentIsPending: false,
      failedToCreateComment: false,
    });
  });
});
