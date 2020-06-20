import React from 'react';
import ReactDOM from 'react-dom';

class App {
  render() {
    return (
      <h1>
        You've figured out webpack!
      </h1>
    )
  }
}

const app = document.getElementById('#app');

ReactDOM.render(
  <App />,
  app,
  () => {
    console.log('Congrats!');
  }
)

