import * as data from '../data/drinks.json';
import {Ingredient} from './Types';

type RawData = {
  name: string;
  img: string;
  ingredients: string[];
  measures: string[];
  instructions?: string;
}[];

function loadData(): RawData {
  return Object.keys(data).map((k) => data[k as unknown as number]);
}

export default class DataStore {
  _ingredients: Set<Ingredient>;

  constructor() {
    const ingredients = Array.prototype.concat.apply(([] as string[]),
      loadData().map((d) => d.ingredients));
    this._ingredients = new Set(ingredients);
  }

  ingredients() {
    return this._ingredients;
  }
}
