import { hydrate } from "solid-js/web";
import { Client } from '../components/components.well';

hydrate(() => <Client />, document.getElementById("app")!);
