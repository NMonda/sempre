import { render, queries, within } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
// import * as customQueries from "./custom-queries";

const allQueries = {
  ...queries,
  //   ...customQueries,
};

function AllTheProviders({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const customScreen = within(document.body, allQueries);
const customWithin = (element) => within(element, allQueries);
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, queries: allQueries, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
};
