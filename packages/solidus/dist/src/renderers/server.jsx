"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidusRenderer = void 0;
const web_1 = require("solid-js/web");
const solid_meta_1 = require("solid-meta");
const components_well_1 = require("../components/components.well");
class SolidusRenderer {
    constructor() { }
    /**
     *
     * @param App the app to render.
     * @param url the URL of the
     * @returns
     */
    renderSync(App) {
        let tags = [];
        const head = (0, solid_meta_1.renderTags)(tags);
        const hydration = (0, web_1.generateHydrationScript)();
        const body = (0, web_1.renderToString)(() => (<components_well_1.Server tags={tags}>
        <App />
      </components_well_1.Server>));
        return {
            head,
            hydration,
            body,
        };
    }
}
exports.SolidusRenderer = SolidusRenderer;
