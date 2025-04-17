// import { AxiosInstance, AxiosResponse } from "axios";
// import {
//   WalletResponse,
//   WalletResponseMessage,
//   WalletResponseStatus,
// } from "../../../types/wallet";

// const assignGeneralInterceptor = (
//   axiosInstance: AxiosInstance
// ): AxiosInstance => {
//   axiosInstance.interceptors.request.use((config) => {
//     // Có thể thêm xử lý chung cho request ở đây
//     return config;
//   });

//   axiosInstance.interceptors.response.use(
//     (response: AxiosResponse) => {
//       const formattedResponse: WalletResponse<any> = {
//         success: true,
//         message: WalletResponseMessage.SUCCESS,
//         data: response.data,
//         status: WalletResponseStatus.SUCCESS,
//         serverStatus: response.status,
//       };

//       return {
//         ...response,
//         data: walletResponse
//       };
//     },
//     (error) => {
//       // Xử lý response lỗi
//       if (error.response) {
//         // Server trả về response với status code lỗi (4xx, 5xx)
//         const errorResponse: WalletResponse<null> = {
//           success: false,
//           message:
//             error.response.status >= 500
//               ? WalletResponseMessage.SERVER_ERROR
//               : WalletResponseMessage.WALLET_HANDLE_ERROR,
//           data: null,
//           status:
//             error.response.status >= 500
//               ? WalletResponseStatus.SERVER_ERROR
//               : WalletResponseStatus.WALLET_HANDLE_ERROR,
//           serverStatus: error.response.status,
//         };

//         return Promise.reject(errorResponse);
//       } else if (error.request) {
//         // Request được gửi đi nhưng không nhận được response
//         const errorResponse: WalletResponse<null> = {
//           success: false,
//           message: WalletResponseMessage.SERVER_ERROR,
//           data: null,
//           status: WalletResponseStatus.SERVER_ERROR,
//           serverStatus: null,
//         };

//         return Promise.reject(errorResponse);
//       } else {
//         // Có lỗi khi thiết lập request
//         const errorResponse: WalletResponse<null> = {
//           success: false,
//           message: WalletResponseMessage.WALLET_HANDLE_ERROR,
//           data: null,
//           status: WalletResponseStatus.WALLET_HANDLE_ERROR,
//           serverStatus: null,
//         };

//         return Promise.reject(errorResponse);
//       }
//     }
//   );

//   return axiosInstance;
// };

// export default assignGeneralInterceptor;
