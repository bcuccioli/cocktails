import * as React from 'react';
import Bar from './Bar';
import {Ingredient} from './util/Types';
import {render} from 'react-dom';

interface TState {
  bar: Set<Ingredient>;
}

class Application extends React.Component {
  state: TState = {
    bar: new Set(),
  };

  render() {
    return (
      <React.Fragment>
        <h1>Cocktails</h1>
        <Bar
          selectedIngredients={this.state.bar}
          onAddRemove={this.updateIngredient.bind(this)}
        />
      </React.Fragment>
    );
  }

  private updateIngredient(i: Ingredient) {
    const bar = new Set(this.state.bar);

    if (bar.has(i)) {
      bar.delete(i);
    } else {
      bar.add(i);
    }

    this.setState({
      ...this.state,
      bar: bar,
    });
  }
}

render(<Application />, document.getElementById('root'));
