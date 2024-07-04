// sample axios mock file and its usage
export default {
  defaults: {
    headers: {
      common: {
        "Content-Type": "",
        Authorization: "",
      },
    },
  },
  get: jest.fn(() => Promise.resolve({ data: {} })),
  //   post: jest.fn(() => Promise.resolve({ data: {}, status:200 })),
  post: jest.fn((url) => {
    console.log("URL", url);
    if (
      url === "/api/bulk-upload" ||
      url === "https://api.safaricom.co.ke/api/files/v1/upload/multiple"
    ) {
      return Promise.resolve({
        data: {
          responseData: [
            {
              fileName: "file.png",
              fileResponseUri: "https://123.com",
            },
          ],
        },
        status: 200,
      });
    }
    if (
      url === "/api/save-request" ||
      url === "https://api.safaricom.co.ke/api/v2/save/request"
    ) {
      return Promise.resolve({
        data: {
          body: {
            applicationId: "123-123",
          },
          status: 200,
          header: {
            responseMessage: "SUCCESS",
          },
        },
      });
    }
  }),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(function () {
    return {
      interceptors: {
        request: {
          use: jest.fn(() => Promise.resolve({ data: {} })),
        },
      },

      defaults: {
        headers: {
          common: {
            "Content-Type": "",
            Authorization: "",
          },
        },
      },
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn((url) => {
        if (url === "v2/save/request") {
          return Promise.resolve({
            data: {
              body: {
                applicationId: "123-123",
              },
              status: 200,
              header: {
                responseMessage: "SUCCESS",
              },
            },
            status: 200,
          });
        }
      }),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
    };
  }),
};
