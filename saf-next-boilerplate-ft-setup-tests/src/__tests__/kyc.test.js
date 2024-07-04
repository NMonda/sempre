// sample test file from the demo
// file does not exist on this repo

// uncomment the below section to read
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇

// import React from "react";
// import userEvent from "@testing-library/user-event";
// import axios from "axios";
// import {
//   render,
//   renderHook,
//   act,
//   screen,
//   fireEvent,
//   waitFor,
// } from "../../../utils/test-utils";
// import KycDocuments from "../../../components/Dialogs/kyc";
// import { useStore } from "../../../api/AppGlobalStore";

// const renderKyc = () => {
//   return render(<KycDocuments handleSubmit={jest.fn()} />);
// };
// const dummyKycDocuments = [
//   {
//     name: "Dummy Name.png",
//     description: "Dummy Description",
//   },
// ];
// const submitButtonTriggerEvents = async () => {
//   const user = userEvent.setup();
//   const { result } = renderHook(() => useStore());
//   await act(() => result.current.setKcDocuments(dummyKycDocuments));
//   renderKyc();
//   await waitFor(async () => {
//     await fireEvent.change(await screen.findByTestId("input"), {
//       target: {
//         files: [
//           {
//             size: 1000,
//             name: "ho.jpg",
//           },
//           {
//             size: 1000,
//             name: "ko.jpg",
//           },
//           {
//             size: 1000,
//             name: "po.jpg",
//           },
//         ],
//       },
//     });
//   });
//   await waitFor(async () => {
//     await user.click(await screen.findByText("Submit"));
//   });
// };

// global.URL.createObjectURL = jest.fn();
// jest.mock("axios");

// describe("KycDocuments", () => {
//   beforeEach(() => jest.clearAllMocks());
//   afterAll(() => jest.clearAllMocks());
//   test("it should create a snapshot", () => {
//     const { container } = renderKyc();
//     expect(container).toMatchSnapshot();
//   });
//   test("zustand hooks initial state", () => {
//     const { result } = renderHook(() => useStore());
//     expect(result.current.kycDocuments).toEqual([]);
//     expect(result.current.formApplicationData).toEqual({});
//     expect(result.current.otpPhoneNo).toEqual("");
//     expect(result.current.beneficiaryFormStatus).toEqual("");
//     expect(result.current.sessionId).toEqual("");
//   });
//   test("ensure that useEffect has been called", async () => {
//     const { result } = renderHook(() => useStore());
//     await act(() => result.current.setBeneficiaryFormStatus("NO"));
//     await act(() => result.current.setKcDocuments(dummyKycDocuments));
//     renderKyc();
//     expect(result.current.beneficiaryFormStatus).toEqual("NO");
//   });
//   test("ensure that onchange event has been triggered", async () => {
//     const { result } = renderHook(() => useStore());
//     await act(() => result.current.setKcDocuments(dummyKycDocuments));
//     renderKyc();
//     await waitFor(async () => {
//       await fireEvent.change(await screen.findByTestId("input"), {
//         target: {
//           files: [
//             {
//               size: 1000,
//               name: "ho.png",
//             },
//           ],
//         },
//       });
//     });
//   });
//   test("ensure that file validation is done on file size", async () => {
//     const { result } = renderHook(() => useStore());
//     await act(() => result.current.setKcDocuments(dummyKycDocuments));
//     renderKyc();
//     await waitFor(async () => {
//       await fireEvent.change(await screen.findByTestId("input"), {
//         target: {
//           files: [
//             {
//               size: 100000000,
//               name: "ho.jpg",
//             },
//           ],
//         },
//       });
//     });
//   });
//   test("ensure that file validation is done on file name extension", async () => {
//     const { result } = renderHook(() => useStore());
//     await act(() => result.current.setKcDocuments(dummyKycDocuments));
//     renderKyc();
//     await waitFor(async () => {
//       await fireEvent.change(await screen.findByTestId("input"), {
//         target: {
//           files: [
//             {
//               size: 1000,
//               name: "ho.kpg",
//             },
//           ],
//         },
//       });
//     });
//   });
//   test("ensure that submit has been called", async () => {
//     await submitButtonTriggerEvents();
//   });
//   test("ensure that submit has been called and sendFileService resolves successfully", async () => {
//     await submitButtonTriggerEvents();
//   });
//   test("ensure that submit has been called and sendFileService does not resolve with status code 200", async () => {
//     await submitButtonTriggerEvents();
//     const responseBody = {
//       data: {
//         responseData: [
//           {
//             fileName: "file.png",
//             fileResponseUri: "https://123.com",
//           },
//         ],
//       },
//       status: 300,
//     };
//     axios.post.mockImplementationOnce(() => Promise.resolve(responseBody));
//   });
//   test("ensure that submit has been called and sendFilesService resolves unsuccessfully", async () => {
//     await submitButtonTriggerEvents();
//     axios.post.mockRejectedValueOnce(new Error("Failed to fetch"));
//   });
//   test("ensure that submit has been called and saveRequestApi resolves successfully", async () => {
//     await submitButtonTriggerEvents();
//   });
// });
