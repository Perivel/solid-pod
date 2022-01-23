import { render } from 'solid-js/web';
import View from './components/view/View';
import './index.css';
import App from './App';

render(
  () => (
    <View
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
