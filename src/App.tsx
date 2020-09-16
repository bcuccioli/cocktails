import * as React from 'react';
import Available from './Available';
import Bar from './Bar';
import Recommended from './Recommended';
import {render} from 'react-dom';

interface TState {
  bar: Set<string>;
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
        <header>
          <h1>Cocktails</h1>
          <Bar
            selectedIngredients={this.state.bar}
            onAddRemove={this.updateIngredient.bind(this)}
          />
        </header>
        <Available selectedIngredients={this.state.bar} />
        <Recommended selectedIngredients={this.state.bar} />
      </React.Fragment>
    );
  }

  private updateIngredient(i: string) {
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
