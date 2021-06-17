import reducer, { loadAllPreviews } from "./articlePreviewsSlice";
import articlesData from "../../mocks/articles.json";
import { getArticles } from "../../mocks/handlers";

jest.mock("../../mocks/handlers");

describe("articlePreviews", () => {
  const initialState = {
    articles: [],
    isLoadingArticlePreviews: false,
    hasError: false,
  };

  it("should load articles", async () => {
    getArticles.mockResolvedValueOnce(articlesData);

    const actionCreator = loadAllPreviews();
    const action = await actionCreator(jest.fn(), initialState);
    const nextState = await reducer(initialState, action);

    expect(nextState).toEqual({
      articles: articlesData,
      isLoadingArticlePreviews: false,
      hasError: false,
    });
  });

  it("should handle an API error", async () => {
    getArticles.mockRejectedValueOnce();

    const actionCreator = loadAllPreviews();
    const action = await actionCreator(jest.fn(), initialState);
    const nextState = await reducer(initialState, action);

    expect(nextState).toEqual({
      articles: [],
      isLoadingArticlePreviews: false,
      hasError: true,
    });
  });
});
