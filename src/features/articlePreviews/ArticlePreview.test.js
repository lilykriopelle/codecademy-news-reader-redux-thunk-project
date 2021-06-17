import ArticlePreviews from "./ArticlePreviews";
import { useDispatch, useSelector } from "react-redux";
import { fireEvent, render } from "@testing-library/react";
import { loadCurrentArticle } from "../currentArticle/currentArticleSlice";

jest.mock("react-redux");
jest.mock("../currentArticle/currentArticleSlice");

describe("ArticlePreviews", () => {
  beforeEach(() => {
    useDispatch.mockImplementation(jest.fn);
  });

  it("should render a loading screen when loading", () => {
    useSelector.mockReturnValueOnce([]).mockReturnValueOnce(true);

    const { queryByText } = render(<ArticlePreviews />);

    queryByText("loading state");
  });

  it("should render articles", () => {
    const mockArticles = [
      {
        id: 1,
        title: "A News Article About World News",
        preview:
          "The preview of the article about world news Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://loremflickr.com/215/157",
      },
      {
        id: 2,
        title: "A News Article About USA News",
        preview:
          "The preview of the article about USA news Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://loremflickr.com/215/157",
      },
    ];
    useSelector.mockReturnValueOnce(mockArticles).mockReturnValueOnce(false);

    const { queryByText } = render(<ArticlePreviews />);

    mockArticles.forEach(({ title }) => {
      queryByText(title);
    });
  });

  it("should load an article when clicked on", () => {
    loadCurrentArticle.mockImplementation(jest.fn);
    const mockArticles = [
      {
        id: 1,
        title: "A News Article About World News",
        preview:
          "The preview of the article about world news Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://loremflickr.com/215/157",
      },
      {
        id: 2,
        title: "A News Article About USA News",
        preview:
          "The preview of the article about USA news Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://loremflickr.com/215/157",
      },
    ];
    useSelector.mockReturnValueOnce(mockArticles).mockReturnValueOnce(false);

    const { queryByText } = render(<ArticlePreviews />);
    fireEvent.click(queryByText(mockArticles[0].title));

    expect(loadCurrentArticle).toHaveBeenCalledWith(mockArticles[0].id);
  });
});
