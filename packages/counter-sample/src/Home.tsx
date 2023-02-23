import { Component, createEffect, createMemo, createSignal } from 'solid-js';
import { Title } from '@solidjs/meta';
import { useNavigate } from '@solidjs/router';

const Home: Component = () => {
  const [count, setCount] = createSignal(0);
  const navigate = useNavigate();

  const increment = () => setCount(count() + 1);
  const decrement = () => setCount(count() - 1);
  const [message, setMessage] = createSignal("Even");
  
  createEffect(() => {
    console.log('Executing efect in Home Component')
    const rem = count() / 2;
    if (rem === 0) {
      setMessage("Even");
    }
    else {
      setMessage("Odd");
    }
  });

  const goToAbout = () => navigate('/about');

  
  return (
    <>
    <Title>Solidus Counter</Title>
    <div class="App">
      <header class="header">
        <img src='./logo.svg' class="logo" alt="logo" />
        <p>Count: {count()}</p>
        <p>Odd or Even: {message()}</p>
        <button class="btn" onClick={increment}>Increment</button>
        <button class="btn" onClick={decrement}>Decrement</button>
        <button class="btn" onClick={goToAbout}>Learn More</button>
      </header>
    </div>
    </>
  );
};

export default Home;