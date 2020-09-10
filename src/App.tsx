import * as React from 'react';
import Available from './Available';
import Bar from './Bar';
import {Ingredient} from './util/Types';
import {render} from 'react-dom';

interface TState {
  bar: Set<Ingredient>;
}

function loadFromLS() {
  const s = window.localStorage.getItem('bar');
  const list: string[] = s ? JSON.parse(s) : [];
  return new Set(list);
}

class Application extends React.Component {
  state: TState = {
    bar: loadFromLS(),
  };

  render() {
    return (
      <React.Fragment>
        <h1>Cocktails</h1>
        <Bar
          selectedIngredients={this.state.bar}
          onAddRemove={this.updateIngredient.bind(this)}
        />
        <Available selectedIngredients={this.state.bar} />
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

    window.localStorage.setItem('bar', JSON.stringify([...bar]));

    this.setState({
      ...this.state,
      bar: bar,
    });
  }
}

render(<Application />, document.getElementById('root'));
