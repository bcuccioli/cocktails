import * as data from '../data/drinks.json';

type Cocktail = {
  name: string;
  img: string;
  ingredients: Set<string>;
  measures: string[];
  instructions: string;
};

function loadData() {
  return Object.keys(data)
    .filter((idx) => !isNaN(idx as any))
    .map((k) => data[k as unknown as number]);
}

function contains<T>(set: Set<T>, subset: Set<T>) {
  for (const s of subset) {
    if (!set.has(s)) {
      return false;
    }
  }
  return true;
}

class DataStoreImpl {
  _ingredients: string[];
  _cocktails: Cocktail[];
  _ctMap: Map<number, Set<string>>;

  constructor(
    ingredients: string[],
    cocktails: Cocktail[],
    ctMap: Map<number, Set<string>>,
  ) {
    this._ingredients = ingredients;
    this._cocktails = cocktails;
    this._ctMap = ctMap;
  }

  ingredients() {
    return this._ingredients;
  }

  cocktails() {
    return this._cocktails;
  }

  available(bar: Set<string>) {
    return this._cocktails.filter((c) => contains(bar, c.ingredients));
  }

  ctMap() {
    return this._ctMap;
  }
}

export default class DataStore {
  private static d: DataStoreImpl;

  public static get() {
    if (!DataStore.d) {
      const rawData = loadData();

      const ingredients = Array.prototype.concat.apply([] as string[],
        rawData.map((d) => d.ingredients));

      const ingredientsDedup = [...new Set(ingredients)];
      ingredientsDedup.sort();

      const cocktails = rawData.map((d) => ({
        ...d,
        ingredients: new Set(d.ingredients),
        instructions: d.instructions || '',
      }));

      const ctMap: Map<number, Set<string>> = new Map();

      for (let i = 0; i < cocktails.length; i += 1) {
        ctMap.set(i, cocktails[i].ingredients);
      }

      DataStore.d = new DataStoreImpl(
        ingredientsDedup,
        cocktails,
        ctMap,
      );
    }

    return DataStore.d;
  }
}
