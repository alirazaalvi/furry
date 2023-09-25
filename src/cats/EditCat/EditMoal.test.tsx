import { render, screen, fireEvent } from "@testing-library/react";
import { EditModal } from "./EditModal";
import { Cat, Gender } from "../types";

// Mock a function to pass as onSubmit prop
const mockOnSubmit = jest.fn();

const sampleCat: Cat = {
  id: 1,
  name: "Whiskers",
  gender: Gender.Male,
  birthDate: new Date("2020-01-15"),
};

describe("EditModal", () => {
  test("renders the modal when 'show' is true", () => {
    render(
      <EditModal
        show={true}
        onClose={() => {}}
        toggleModal={() => {}}
        cat={sampleCat}
        handleSubmit={mockOnSubmit}
      />
    );

    // Check if modal content is rendered when 'show' is true
    expect(screen.getByText("Add/Edit Kitty")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  test("does not render the modal when 'show' is false", () => {
    render(
      <EditModal
        show={false}
        onClose={() => {}}
        toggleModal={() => {}}
        cat={sampleCat}
        handleSubmit={mockOnSubmit}
      />
    );

    // Check if modal content is not rendered when 'show' is false
    expect(screen.queryByText("Add/Edit Kitty")).toBeNull();
    expect(screen.queryByText("Save Changes")).toBeNull();
  });

  test("calls toggleModal with false when close button is clicked", () => {
    const toggleModal = jest.fn();
    render(
      <EditModal
        show={true}
        onClose={() => {}}
        toggleModal={toggleModal}
        cat={sampleCat}
        handleSubmit={mockOnSubmit}
      />
    );

    // Click the close button
    fireEvent.click(screen.getByText("×"));

    // Expect that toggleModal has been called with false
    expect(toggleModal).toHaveBeenCalledWith(false);
  });
});
