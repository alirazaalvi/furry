import { render, screen, fireEvent } from "@testing-library/react";
import { Sort, SortDirection, getSortDirection } from "./Sort";

// Mock a function to pass as handleSort prop
const mockHandleSort = jest.fn();

describe("Sort", () => {
  test("renders the component with default sort direction", () => {
    render(<Sort handleSort={mockHandleSort} />);

    // Check if the component content is rendered
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Sort Icon")).toBeInTheDocument();

    // Default sort direction should be None
    expect(getSortDirection(SortDirection.None)).toBe(SortDirection.Asc);
  });

  test("calls handleSort with Asc sort direction when the sort icon is clicked from None", () => {
    render(<Sort handleSort={mockHandleSort} />);
    const sortIcon = screen.getByLabelText("Sort Icon");

    // Click the sort icon from None
    fireEvent.click(sortIcon);

    // Expect that handleSort has been called with Asc sort direction
    expect(mockHandleSort).toHaveBeenCalledWith(SortDirection.Asc);
  });

  test("calls handleSort with Asc sort direction when the sort icon is clicked from Desc", () => {
    render(<Sort handleSort={mockHandleSort} />);
    const sortIcon = screen.getByLabelText("Sort Icon");

    // Click the sort icon from Desc
    fireEvent.click(sortIcon); // Desc to None
    fireEvent.click(sortIcon); // None to Asc

    // Expect that handleSort has been called with Asc sort direction
    expect(mockHandleSort).toHaveBeenCalledWith(SortDirection.Asc);
  });
});
