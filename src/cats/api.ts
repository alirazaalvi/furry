import { SortDirection } from "./Sort";
import { Cat } from "./types";

export const updateCat = (cat: Cat, cats: Cat[]): Cat[] => {
  const state = [...cats];

  if (cat.id) {
    const index = cats.findIndex((c) => c.id === cat.id);
    state[index] = cat;
  } else {
    cat.id = Date.now(); // Only to generate a unique id for prototype although it will not work on scale.
    state.push(cat);
  }

  return state;
};

export const removeCat = (cat: Cat, cats: Cat[]): Cat[] => {
  const state = [...cats];
  return state.filter((item: Cat) => item.id !== cat.id);
};

export const sortCats = (sortDirection: SortDirection, cats: Cat[]): Cat[] => {
  const state = [...cats];

  if (sortDirection === SortDirection.Asc)
    return state.sort((a: Cat, b: Cat) => (a.name > b.name ? 1 : -1));
  else if (sortDirection === SortDirection.Desc)
    return state.sort((a: Cat, b: Cat) => (a.name < b.name ? 1 : -1));
  else return state;
};
