import { fireEvent, render, screen } from "@testing-library/react";
import { CommentFormComponent } from "./CommentForm";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("CommentForm", () => {
  const mockHandleSubmit = jest.fn((comment) => {});

  beforeEach(() => {
    mockHandleSubmit.mockClear();
  });

  it("should initially render a form", () => {
    render(
      <CommentFormComponent
        handleSubmit={mockHandleSubmit}
        createPending={false}
      />
    );

    screen.getByLabelText("Add Comment:");
    expect(screen.getByText("Submit")).toBeDisabled();
  });

  it("should disable the submit button when adding a comment", () => {
    render(
      <CommentFormComponent
        handleSubmit={mockHandleSubmit}
        createPending={true}
      />
    );

    expect(screen.getByText("Submit")).toBeDisabled();
  });

  it("should create a new comment", () => {
    render(
      <CommentFormComponent
        handleSubmit={mockHandleSubmit}
        createPending={false}
      />
    );

    userEvent.type(screen.getByRole("textbox"), "A fancy new comment");
    userEvent.click(screen.getByText("Submit"));

    expect(mockHandleSubmit).toBeCalledWith("A fancy new comment");
  });
});
