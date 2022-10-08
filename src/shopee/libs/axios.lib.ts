import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export default class HttpClient {
  #logger: Logger = new Logger(HttpClient.name);

  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.request.use(
      (value) => {
        this.#logger.log(`url: [${value.method.toUpperCase()}] ${value.url}`);
      },
      (error) => {
        this.#logger.error(error.message);
      },
    );

    this.httpService.axiosRef.interceptors.response.use(
      (value) => {
        this.#logger.log(`data: ${value.data}`);
      },
      (error) => {
        this.#logger.error(error.message);
      },
    );
  }

  get<T = any>(url: string, config?: AxiosRequestConfig<T>) {
    return this.httpService.get<T>(url, config);
  }

  post<T = any>(url: string, data?: T, config?: AxiosRequestConfig<T>) {
    return this.httpService.post<T>(url, data, config);
  }
}
