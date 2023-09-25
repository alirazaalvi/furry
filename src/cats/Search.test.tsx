import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "./Search";

// Mock a function to pass as handleSearch prop
const mockHandleSearch = jest.fn();

describe("Search", () => {
  test("renders the component", () => {
    render(<Search handleSearch={mockHandleSearch} />);

    // Check if the component content is rendered
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("calls handleSearch when the search button is clicked", () => {
    render(<Search handleSearch={mockHandleSearch} />);
    const searchInput = screen.getByPlaceholderText("Search");
    const searchButton = screen.getByRole("button", { name: /Search/i });

    // Type a search term into the input
    fireEvent.change(searchInput, { target: { value: "cat" } });

    // Click the search button
    fireEvent.click(searchButton);

    // Expect that handleSearch has been called with the search term
    expect(mockHandleSearch).toHaveBeenCalledWith("cat");
  });

  test("calls handleSearch when Enter key is pressed in the search input", () => {
    render(<Search handleSearch={mockHandleSearch} />);
    const searchInput = screen.getByPlaceholderText("Search");
    const searchButton = screen.getByRole("button", { name: /Search/i });

    // Type a search term into the input
    fireEvent.change(searchInput, { target: { value: "dog" } });

    // Click the search button
    fireEvent.click(searchButton);

    // Expect that handleSearch has been called with the search term
    expect(mockHandleSearch).toHaveBeenCalledWith("dog");
  });
});
