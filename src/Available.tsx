import * as React from 'react';
import {Card} from '@blueprintjs/core';
import DataStore from './util/DataStore';
import {Ingredient} from './util/Types';

const Available: React.FunctionComponent<{
  selectedIngredients: Set<Ingredient>;
}> = (props) => {
  const available = DataStore.get().available(props.selectedIngredients);

  return (
    <div id="available">
      <h1>Available</h1>
      {available.map((c, k) =>
        <Card key={k} interactive={true}>
          <h3>{c.name}</h3>
          <img src={c.img} />
          <br />
          <i>{c.instructions}</i>
          <h5>Ingredients</h5>
          <ul>
            {[...c.ingredients].map((i) => <li>{i}</li>)}
          </ul>
        </Card>)}
    </div>
  );
};

export default Available;
