import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

@Injectable()
export default class HttpClient {
  readonly #logger: Logger = new Logger(HttpClient.name);
  readonly #axios: AxiosInstance = null;

  constructor() {
    this.#axios = Axios.create();
    this.#axios.interceptors.request.use(
      (value) => {
        this.#logger.log(`[${value.method.toUpperCase()}] ${value.url}`);
        if (value.data) {
          this.#logger.log(`body: ${JSON.stringify(value.data, null, 4)}`);
        }

        return value;
      },
      (error) => {
        this.#logger.error(error);
        return error;
      },
    );

    this.#axios.interceptors.response.use(
      (value) => {
        this.#logger.log(`[Response]: ${JSON.stringify(value.data, null, 4)}`);
        return value;
      },
      (error) => {
        this.#logger.error(error);
        return error;
      },
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig<T>) {
    return this.#axios.get<T>(url, config);
  }

  post<T = any>(url: string, data?: T, config?: AxiosRequestConfig<T>) {
    return this.#axios.post<T>(url, data, config);
  }
}
