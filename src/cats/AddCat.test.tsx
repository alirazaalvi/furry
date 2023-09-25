import { render, screen, fireEvent } from "@testing-library/react";
import { AddCat } from "./AddCat";
import { Cat, Gender } from "./types";

// Mock a function to pass as handleAdd prop
const mockHandleAdd = jest.fn();

const sampleCats: Cat[] = [
  {
    id: 1,
    name: "Whiskers",
    gender: Gender.Male,
    birthDate: new Date("2020-01-15"),
  },
  {
    id: 2,
    name: "Fluffy",
    gender: Gender.Female,
    birthDate: new Date("2019-05-20"),
  },
];

describe("AddCat", () => {
  test("renders the component", () => {
    render(<AddCat cats={sampleCats} handleAdd={mockHandleAdd} />);

    // Check if the component content is rendered
    expect(screen.getByLabelText("Add Cat Icon")).toBeInTheDocument();
  });

  test("calls handleAdd when the plus circle is clicked", () => {
    render(<AddCat cats={sampleCats} handleAdd={mockHandleAdd} />);

    // Click the plus circle
    fireEvent.click(screen.getByLabelText("Add Cat Icon"));

    // Expect that handleAdd has been called with the sampleCats array
    expect(mockHandleAdd).toHaveBeenCalledWith(sampleCats);
  });
});
