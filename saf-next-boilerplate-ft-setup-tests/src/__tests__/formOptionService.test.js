// sample test file from the demo
// file does not exist on this repo

// uncomment the below section to read
// 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇

// import axios from "axios";
// import {
//   getCountiesApi,
//   getBanksApi,
//   getBusinessCategoriesApi,
//   getCountiesRegionApi,
//   getBranchesApi,
//   getBusinessDescriptionApi,
//   getNationalitiesApi,
//   getRegionsApi,
// } from "../../../api/services/formOptionService";

// jest.mock("axios");
// const mockedAxios = axios;

// const mockSuccessApiCall = async (fn) => {
//   const mockedResponse = {
//     data: {
//       body: {
//         abc: "124",
//       },
//     },
//     status: 200,
//     statusText: "OK",
//     headers: {},
//     config: {},
//   };
//   mockedAxios.post.mockResolvedValueOnce(mockedResponse);
//   await fn();
//   expect(axios.post).toHaveBeenCalled();
// };

// const mockFailedApiCall = async (fn) => {
//   await fn();
//   mockedAxios.post.mockRejectedValueOnce(new Error("Failed to fetch"));
// };

// describe("FormOptionsService apis", () => {
//   test("getCountiesApi resolves successfully", async () => {
//     const mockedResponse = {
//       data: {
//         body: {
//           abc: "123",
//         },
//       },
//       status: 200,
//       statusText: "OK",
//       headers: {},
//       config: {},
//     };
//     const returnedRes = { abc: "123" };
//     mockedAxios.post.mockResolvedValueOnce(mockedResponse);
//     expect(axios.post).not.toHaveBeenCalled();
//     const data = await getCountiesApi();
//     expect(axios.post).toHaveBeenCalled();
//     expect(data).toEqual(returnedRes);
//   });

//   test("getCountiesApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getCountiesApi);
//   });

//   test("getBanksApi resolves successfully", async () => {
//     mockSuccessApiCall(getBanksApi);
//   });

//   test("getBanksApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getBanksApi);
//   });

//   test("getBusinessCategoriesApi resolves successfully", async () => {
//     mockSuccessApiCall(getBusinessCategoriesApi);
//   });

//   test("getBusinessCategoriesApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getBusinessCategoriesApi);
//   });

//   test("getCountiesRegionApi resolves successfully", async () => {
//     mockSuccessApiCall(getCountiesRegionApi);
//   });

//   test("getCountiesRegionApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getCountiesRegionApi);
//   });

//   test("getBranchesApi resolves successfully", async () => {
//     mockSuccessApiCall(getBranchesApi);
//   });

//   test("getBranchesApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getBranchesApi);
//   });

//   test("getBusinessDescriptionApi resolves successfully", async () => {
//     mockSuccessApiCall(getBusinessDescriptionApi);
//   });

//   test("getBusinessDescriptionApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getBusinessDescriptionApi);
//   });

//   test("getNationalitiesApi resolves successfully", async () => {
//     mockSuccessApiCall(getNationalitiesApi);
//   });

//   test("getNationalitiesApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getNationalitiesApi);
//   });

//   test("getRegionsApi resolves successfully", async () => {
//     mockSuccessApiCall(getRegionsApi);
//   });

//   test("getRegionsApi resolves unsuccessfully", async () => {
//     mockFailedApiCall(getRegionsApi);
//   });
// });
