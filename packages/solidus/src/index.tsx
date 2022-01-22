import { render } from 'solid-js/web';
import Application from './components/application/Application';
import './index.css';
import App from './App';

render(
  () => (
    <Application
      //index={<App />}
      routes={[
        {
          path: "/",
          component: App,
        },
      ]}
    />
  ),
  document.getElementById("root") as HTMLElement
);
