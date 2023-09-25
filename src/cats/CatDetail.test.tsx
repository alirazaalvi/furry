import { render, screen, fireEvent } from "@testing-library/react";
import { CatDetail } from "./CatDetail";
import { Cat, Gender } from "./types";

// Mock functions to pass as props
const mockHandleEditModal = jest.fn();
const mockHandleRemove = jest.fn();

const sampleCat: Cat = {
  id: 1,
  name: "Whiskers",
  gender: Gender.Male,
  birthDate: new Date("2020-01-15"),
  bio: "A cute cat.",
  image: "cat.jpg",
};

describe("CatDetail", () => {
  test("renders the component with cat details", () => {
    render(
      <CatDetail
        cat={sampleCat}
        handleEditModal={mockHandleEditModal}
        handleRemove={mockHandleRemove}
      />
    );

    // Check if the component content is rendered
    expect(screen.getByText("Whiskers")).toBeInTheDocument();
    expect(screen.getByText("A cute cat.")).toBeInTheDocument();
    expect(screen.getByAltText("Whiskers")).toBeInTheDocument();
  });

  test("calls handleEditModal when the edit icon is clicked", () => {
    render(
      <CatDetail
        cat={sampleCat}
        handleEditModal={mockHandleEditModal}
        handleRemove={mockHandleRemove}
      />
    );
    const editIcon = screen.getByLabelText("Edit Cat Icon");

    // Click the edit icon
    fireEvent.click(editIcon);

    // Expect that handleEditModal has been called with true and the sampleCat
    expect(mockHandleEditModal).toHaveBeenCalledWith(true, sampleCat);
  });

  test("calls handleRemove when the remove icon is clicked", () => {
    render(
      <CatDetail
        cat={sampleCat}
        handleEditModal={mockHandleEditModal}
        handleRemove={mockHandleRemove}
      />
    );
    const removeIcon = screen.getByLabelText("Delete Cat Icon");

    // Click the remove icon
    fireEvent.click(removeIcon);

    // Expect that handleRemove has been called with the sampleCat
    expect(mockHandleRemove).toHaveBeenCalledWith(sampleCat);
  });
});
