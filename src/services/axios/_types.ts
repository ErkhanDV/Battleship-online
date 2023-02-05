import { type InternalAxiosRequestConfig } from 'axios';

export interface ICycleConfig extends InternalAxiosRequestConfig {
  isRetry?: boolean;
}
