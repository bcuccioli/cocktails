import * as React from 'react';
import {Card} from '@blueprintjs/core';
import Cocktail from './Cocktail';
import DataStore from './util/DataStore';
import {Ingredient} from './util/Types';

const rand = () => Math.random().toString(36).substr(0, 8);

const Available: React.FunctionComponent<{
  selectedIngredients: Set<Ingredient>;
}> = (props) => {
  if (props.selectedIngredients.size === 0) {
    return <div></div>;
  }

  const available = DataStore.get().available(props.selectedIngredients);

  return (
    <div id="available">
      <h1>Available</h1>
      {available.map((c) =>
        <Card key={rand()} interactive={true}>
          <Cocktail {...c} />
        </Card>)}
    </div>
  );
};

export default Available;
