import * as React from 'react';

const rand = () => Math.random().toString(36).substr(0, 8);

const Cocktail: React.FunctionComponent<{
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
    <ul key={rand()}>
      {[...props.ingredients].map((i) => <li key={rand()}>{i}</li>)}
    </ul>
  </React.Fragment>;

export default Cocktail;
