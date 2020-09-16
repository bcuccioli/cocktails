import * as React from 'react';

const Cocktail: React.FunctionComponent<{
  idx: number;
  name: string;
  img: string;
  instructions: string;
  ingredients: Set<string>;
}> = (props) =>
  <React.Fragment>
    <h3>{props.name}</h3>
    <img src={props.img} />
    <br />
    <i>{props.instructions}</i>
    <h5>Ingredients</h5>
    <ul>
      {[...props.ingredients].map((i) => <li key={props.idx}>{i}</li>)}
    </ul>
  </React.Fragment>;

export default Cocktail;
