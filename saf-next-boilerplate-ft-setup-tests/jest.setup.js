import "@testing-library/jest-dom";
import React from "react";

jest.mock(
  "next/image",
  () =>
    function Image({ src, alt }) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} />;
    }
);

jest.mock(
  "next/head",
  () =>
    function Head({ children }) {
      return <>{children}</>;
    }
);

jest.mock("next/dynamic", () => {
  return jest.fn(() => "Dynamic");
});
