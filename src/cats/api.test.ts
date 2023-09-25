import { updateCat, removeCat, sortCats } from "./api";
import { Gender, Cat } from "./types";
import { SortDirection } from "./Sort";

describe("Cat Functions", () => {
  let cats: Cat[];

  beforeEach(() => {
    // Initialize cats array before each test.
    cats = [
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
  });

  test("updateCat should update an existing cat", () => {
    const updatedCat: Cat = {
      id: 1,
      name: "Updated Whiskers",
      gender: Gender.Male,
      birthDate: new Date("2020-01-15"),
    };

    const updatedCats = updateCat(updatedCat, cats);

    // Expect that the cat with ID 1 has been updated.
    expect(updatedCats.find((cat) => cat.id === 1)).toEqual(updatedCat);
  });

  test("updateCat should add a new cat", () => {
    const newCat: Cat = {
      id: 0,
      name: "New Cat",
      gender: Gender.Female,
      birthDate: new Date("2021-03-10"),
    };

    const updatedCats = updateCat(newCat, cats);

    // Expect that the new cat has been added with an ID.
    expect(updatedCats.some((cat) => cat.name === "New Cat")).toBeTruthy();
  });

  test("removeCat should remove a cat", () => {
    const catToRemove: Cat = {
      id: 1,
      name: "Whiskers",
      gender: Gender.Male,
      birthDate: new Date("2020-01-15"),
    };

    const updatedCats = removeCat(catToRemove, cats);

    // Expect that the cat with ID 1 has been removed.
    expect(updatedCats.find((cat) => cat.id === 1)).toBeUndefined();
  });

  test("sortCats should sort cats in ascending order by name", () => {
    const sortedCats = sortCats(SortDirection.Asc, cats);

    // Expect that the sorted cats array is in ascending order by name.
    expect(sortedCats.map((cat) => cat.name)).toEqual(["Fluffy", "Whiskers"]);
  });

  test("sortCats should sort cats in descending order by name", () => {
    const sortedCats = sortCats(SortDirection.Desc, cats);

    // Expect that the sorted cats array is in descending order by name.
    expect(sortedCats.map((cat) => cat.name)).toEqual(["Whiskers", "Fluffy"]);
  });
});
