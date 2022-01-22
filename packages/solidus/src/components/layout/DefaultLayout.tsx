import { LayoutComponent } from "../../types/layout-component.type";;

/**
 * DefaultLayout
 *
 * The Default Layout
 */

const DefaultLayout: LayoutComponent = (props) => {
  return <div>{props.content}</div>;
};

export default DefaultLayout;
