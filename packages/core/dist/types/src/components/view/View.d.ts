import { ViewComponent } from "../../types/view-component.type";
/**
 * View
 *
 * A solidus component that automatically sets up routing and a default template.
 * @note Using lazy() in the routes array seems to cause the route to not be defined. Need to fix this bug.
 */
declare const View: ViewComponent;
export default View;
