import * as React from 'react';
import {Ingredient} from './util/Types';

const Bar: React.FunctionComponent<{
  ingredients: Ingredient[];
}> = (props) => {
  return (
    <div>
      {props.ingredients.map((i) => {
        return (
          <div>{i}</div>
        );
      })}
    </div>
  );
};

export default Bar;
