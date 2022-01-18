import { Component } from "solid-js";
import {
  renderToString,
  renderToStream,
  renderToStringAsync,
  generateHydrationScript,
} from "solid-js/web";
import { renderTags } from "solid-meta";
import { Server, TagDetails } from "../components/components.well";
import { RenderResult } from './interfaces/render-result.interface';

export class SolidusRenderer {

  constructor() {}

  /**
   * 
   * @param App the app to render.
   * @param url the URL of the
   * @returns 
   */
  public renderSync(App: Component): RenderResult {
    let tags: TagDetails[] = [];
    const head = renderTags(tags);
    const hydration = generateHydrationScript();
    const body = renderToString(() => (
      <Server tags={tags}>
        <App />
      </Server>
    ));

    return {
      head,
      hydration,
      body,
    };
  }
}
