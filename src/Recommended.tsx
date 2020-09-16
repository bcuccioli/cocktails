import * as React from 'react';
import {Card, Divider} from '@blueprintjs/core';
import Cocktail from './Cocktail';
import DataStore from './util/DataStore';

function difference<T>(s: Set<T>, t: Set<T>) {
  // Return the set s \ t.
  return new Set([...s].filter((x) => !t.has(x)));
}

const Recommended: React.FunctionComponent<{
  selectedIngredients: Set<string>;
}> = (props) => {
  if (props.selectedIngredients.size === 0) {
    return <div></div>;
  }

  const ctMap = DataStore.get().ctMap();
  const inverseMap: Map<string, number[]> = new Map();

  for (const entry of ctMap.entries()) {
    const diff = difference(entry[1], props.selectedIngredients);
    if (diff.size === 1) {
      const ingredient: string = diff.values().next().value;
      inverseMap.set(
        ingredient,
        (inverseMap.get(ingredient) || []).concat(entry[0]),
      );
    }
  }

  // Sort by number of new cocktails, descending.
  const recommendations = [...inverseMap.entries()];
  recommendations.sort((r, s) => s[1].length - r[1].length);

  const cocktails = DataStore.get().cocktails();

  return (
    <div id="recommendations">
      <h1>Recommendations</h1>
      {recommendations.map((r, k) =>
        <Card key={k} interactive={true}>
          Add
          {r[0]}
          for...
          <Divider />
          {r[1].map((idx) =>
            <Cocktail key={idx} {...cocktails[idx]} />)}
        </Card>)}
    </div>
  );
};

export default Recommended;
