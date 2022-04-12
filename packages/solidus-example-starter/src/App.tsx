import { Component, createSignal } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';


const App: Component = () => {
  const [counter, setCounter] = createSignal(0);
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>{counter()}</p>
        <button onClick={() => setCounter(counter() + 1)}>+</button>
        <button onClick={() => setCounter(counter() - 1)}>-</button>
      </header>
    </div>
  );
};

export default App;
