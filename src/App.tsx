import * as React from 'react';
import Bar from './Bar';
import DataStore from './util/DataStore';
import {Ingredient} from './util/Types';
import {render} from 'react-dom';

interface TState {
  bar: Ingredient[];
}

class Application extends React.Component {
  state: TState = {
    bar: [],
  };

  render() {
    return (
      <React.Fragment>
        <h1>Cocktails</h1>
        <Bar ingredients={this.state.bar} />
      </React.Fragment>
    );
  }
}

render(<Application />, document.getElementById('root'));
