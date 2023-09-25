import React from "react";
import { render, screen } from "@testing-library/react";
import { EditCatForm } from "./EditCatForm";
import { Cat, Gender } from "../types";

// Mock a function to pass as onSubmit prop
const mockOnSubmit = jest.fn();

describe("EditCatForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test("renders the form with empty fields", () => {
    render(<EditCatForm onSubmit={mockOnSubmit} toggleModal={() => {}} />);
    // Check if form elements are rendered
    expect(screen.getByLabelText("name")).toBeInTheDocument();
    expect(screen.getByLabelText("birthDate")).toBeInTheDocument();
    expect(screen.getByLabelText("gender")).toBeInTheDocument();
    expect(screen.getByLabelText("bio")).toBeInTheDocument();
  });
});
