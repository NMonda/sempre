// sample test file from the demo
// file does not exist on this repo
// this tests for graphql(apollo)

// uncomment the below section to read
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇

// import React from "react";
// import userEvent from "@testing-library/user-event";
// import { useRouter } from "next/router";
// import { MockedProvider } from "@apollo/client/testing";
// import { GraphQLError } from "graphql";
// import {
//   render,
//   act,
//   screen,
//   waitFor,
// } from "../../../../../src/utils/test-utils";
// import SignIn, {
//   ShowErrors,
// } from "../../../../../src/AppDir/Scenes/Authentication/Login";
// import {
//   SIGN_IN_MUTATION,
//   SIGN_OUT_MUTATION,
// } from "../../../../../src/api/graphql/mutations/auth";

// // jest.mock("next/router", () => ({
// //   useRouter: jest.fn().mockImplementation(() => ({
// //     query: {},
// //     pathname: "/",
// //     push: jest.fn(),
// //   })),
// // }));
// // mock useRouter
// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

// // setup a new mocking function for push method
// const pushMock = jest.fn();

// const renderSignIn = (mocks) => {
//   // @ts-ignore
//   return render(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <SignIn />
//     </MockedProvider>
//   );
// };
// const renderShowErrors = (
//   isRequesting,
//   isAuthContext,
//   error,
//   loginNetError
// ) => {
//   // @ts-ignore
//   return render(
//     <ShowErrors
//       isRequesting={isRequesting}
//       isAuthContext={isAuthContext}
//       error={error}
//       loginNetError={loginNetError}
//     />
//   );
// };
// describe("SignIn", () => {
//   let mocks = [];
//   let signInFailure;
//   let signOutFailure;
//   let signInSuccess;
//   let signOutSuccess;
//   let signInSuccessMobile;
//   beforeAll(() => {
//     signInFailure = {
//       request: {
//         query: SIGN_IN_MUTATION,
//         variables: {
//           input: {
//             emailPhone: "valid@example.com",
//             password: "password123",
//           },
//         },
//       },
//       errors: new GraphQLError("MAAN"),
//     };
//     signOutFailure = {
//       request: {
//         query: SIGN_OUT_MUTATION,
//       },
//       errors: new GraphQLError("MAAN"),
//     };
//     signInSuccess = {
//       request: {
//         query: SIGN_IN_MUTATION,
//         variables: {
//           input: {
//             emailPhone: "valid@example.com",
//             password: "password123",
//           },
//         },
//       },
//       result: {
//         data: {
//           signIn: "token",
//         },
//       },
//     };
//     signInSuccessMobile = {
//       request: {
//         query: SIGN_IN_MUTATION,
//         variables: {
//           input: {
//             emailPhone: "+254719509732",
//             password: "password123",
//           },
//         },
//       },
//       result: {
//         data: {
//           signIn: "token",
//         },
//       },
//     };
//     signOutSuccess = {
//       request: {
//         query: SIGN_OUT_MUTATION,
//       },
//       result: {
//         data: {
//           signOut: true,
//         },
//       },
//     };
//     // @ts-ignore
//     mocks = [
//       signInFailure,
//       signOutFailure,
//       signOutSuccess,
//       signInSuccess,
//       signInSuccessMobile,
//     ];
//   });
//   afterAll(() => {
//     jest.clearAllMocks(); // Clear mock function calls after each test
//   });
//   test("it should match snapshot", () => {
//     useRouter.mockReturnValue({
//       query: {},
//       pathname: "/",
//       push: pushMock,
//     });
//     const { container } = renderSignIn([mocks[2], mocks[3]]);
//     expect(container).toMatchSnapshot();
//   });
//   test("it should trigger handleLogin for name input", async () => {
//     useRouter.mockReturnValue({
//       query: {},
//       pathname: "/",
//       push: pushMock,
//     });
//     const user = userEvent.setup();
//     renderSignIn([mocks[2], mocks[3]]);
//     await user.type(
//       await screen.findByPlaceholderText("Enter your phone number or email"),
//       "valid@example.com"
//     );
//     await user.type(
//       await screen.findByPlaceholderText("Enter your password"),
//       "password123"
//     );
//     await act(async () => {
//       await user.click(await screen.findByTestId("submit"));
//     });
//   });
//   test("it should trigger handleLogin for phoneNumber input", async () => {
//     useRouter.mockReturnValue({
//       query: { from: "123" },
//       pathname: "/",
//       push: pushMock,
//     });
//     const user = userEvent.setup();
//     renderSignIn([mocks[2], mocks[4]]);
//     await user.type(
//       await screen.findByPlaceholderText("Enter your phone number or email"),
//       "0719509732"
//     );
//     await user.type(
//       await screen.findByPlaceholderText("Enter your password"),
//       "password123"
//     );
//     await act(async () => {
//       await user.click(await screen.findByTestId("submit"));
//     });
//   });
//   test("it should trigger RegisterLink onclick", async () => {
//     useRouter.mockReturnValue({
//       query: { from: "123" },
//       pathname: "/",
//       push: pushMock,
//     });
//     const user = userEvent.setup();
//     renderSignIn([mocks[2], mocks[3]]);
//     await waitFor(async () => {
//       await user.click(await screen.findByText("Get started"));
//     });
//     await waitFor(async () => {
//       await user.click(await screen.findByText("Forgot your password?"));
//     });
//   });
//   test("ShowErrors should match snapshot when error is true", () => {
//     const { container } = renderShowErrors(
//       false,
//       true,
//       { message: "Ok" },
//       true
//     );
//     expect(container).toMatchSnapshot();
//   });
//   test("ShowErrors should match snapshot when error is true but lacks message", () => {
//     const { container } = renderShowErrors(false, true, true, true);
//     expect(container).toMatchSnapshot();
//   });
//   test("ShowErrors should match snapshot when loginNetError is true", () => {
//     const { container } = renderShowErrors(false, true, false, true);
//     expect(container).toMatchSnapshot();
//   });
//   test("should throw an error", async () => {
//     useRouter.mockReturnValue({
//       query: { from: "123" },
//       pathname: "/",
//       push: pushMock,
//     });
//     const user = userEvent.setup();
//     jest.mock("../../../../../src/api/graphql/mutations/auth", () => mocks[0]);
//     jest.mock("../../../../../src/api/graphql/mutations/auth", () => mocks[1]);
//     const { container } = renderSignIn([mocks[0], mocks[1]]);
//     await user.type(
//       await screen.findByPlaceholderText("Enter your phone number or email"),
//       "valid@example.com"
//     );
//     await user.type(
//       await screen.findByPlaceholderText("Enter your password"),
//       "password123"
//     );
//     await waitFor(async () => {
//       await user.click(await screen.findByTestId("submit"));
//     });
//     expect(container).toMatchSnapshot();
//   });
// });
