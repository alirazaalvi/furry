import { render, screen } from "@testing-library/react";
import { CatContainer } from "./CatContainer";
import { Cat, Gender } from "./types";

// Mock setCatsData to simulate storing and retrieving data
jest.mock("./store", () => {
  const catsData: Cat[] = [];

  return {
    getCatsData: () => catsData,
    setCatsData: (data: Cat[]) => {
      catsData.length = 0;
      catsData.push(...data);
    },
  };
});

// Mock the API functions used by CatContainer
jest.mock("./api", () => {
  return {
    updateCat: jest.fn(),
    removeCat: jest.fn(),
    sortCats: jest.fn(),
  };
});

describe("CatContainer", () => {
  test("renders the component with cats data", () => {
    // Set up initial cats data
    const initialCats: Cat[] = [
      {
        id: 1,
        name: "Whiskers",
        gender: Gender.Male,
        birthDate: new Date("2020-01-15"),
        bio: "A cute cat.",
        image: "cat.jpg",
      },
      // Add more cats data here
    ];

    // Mock getCatsData to return initialCats
    jest.spyOn(require("./store"), "getCatsData").mockReturnValue(initialCats);

    render(<CatContainer />);

    // Check if the component content is rendered
    expect(screen.getByText("Furry Friends")).toBeInTheDocument();
  });
});
