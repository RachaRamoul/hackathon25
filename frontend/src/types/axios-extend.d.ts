import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    meta?: {
      isSilentAuthCheck?: boolean;
    };
  }
}