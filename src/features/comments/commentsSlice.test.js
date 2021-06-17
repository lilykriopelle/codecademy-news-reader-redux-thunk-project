import reducer, { loadCommentsForArticleId } from "./commentsSlice";
import commentsData from "../../mocks/comments.json";
import { getArticleComments } from "../../mocks/handlers";

jest.mock("../../mocks/handlers");

describe("commentsSlice", () => {
  const initialState = {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
  };

  it("should load comments", async () => {
    getArticleComments.mockResolvedValue({
      articleId: commentsData[1].articleId,
      comments: commentsData.filter(
        (comment) => comment.articleId === commentsData[1].articleId
      ),
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
    getArticleComments.mockRejectedValueOnce({});

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
