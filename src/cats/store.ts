import { Cat } from "./types";
import { catsData } from "./testData";

let catsStore = catsData;

export const getCatsData = () => catsStore;

export const setCatsData = (cats: Cat[]) => {
  catsStore = cats;
};
