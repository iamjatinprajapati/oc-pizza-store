import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

type AxiosDataFetcherOptions = {
  /**
   * Callback which executed before request is sent. You can modify axios config.
   * @param config
   * @returns
   */
  onReq?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * Callback which invoked when request error happened.
   * @param error
   * @returns
   */
  onReqError?: (error: unknown) => unknown;

  /**
   * Calback which invoked when got response from server.
   * @param serverRes
   * @returns
   */
  onRes?: (serverRes: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;

  /**
   * Callback which invoked when status codes fallen outside the range of 2xx.
   * @param error
   * @returns
   */
  onResError?: (error: unknown) => unknown;
};

export type AxiosDataFetcherConfig = AxiosRequestConfig &
  AxiosDataFetcherOptions;

/**
 * Determines whether error is AxiosError
 * @param error
 * @returns
 */
const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export class AxiosDataFetcher {
  private instance: AxiosInstance;

  constructor(dataFetcherConfig: AxiosDataFetcherConfig = {}) {
    const { onReq, onRes, onReqError, onResError, ...axiosConfig } =
      dataFetcherConfig;
    if (axiosConfig.withCredentials === undefined) {
      axiosConfig.withCredentials = true;
    }
    this.instance = axios.create(axiosConfig);

    if (onReq) {
      this.instance.interceptors.request.use(onReq, onReqError);
    }
    if (onRes) {
      this.instance.interceptors.response.use(onRes, onResError);
    }
  }

  /**
   * Implement a data fetcher. @see HtttpDataFetcher<T> type for implementation details/notes.
   * @param url
   * @param data
   * @returns
   */
  fetch<T>(url: string, data?: unknown): Promise<AxiosResponse<T>> {
    return this.instance.request({
      url,
      method: data ? "POST" : "GET",
      data,
    });
  }

  /**
   * Perform a GET request
   * @param url
   * @param config
   * @returns
   */
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config);
  }

  /**
   * Perform a HEAD request
   * @param url
   * @param config
   * @returns
   */
  head(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.head(url, config);
  }

  /**
   * Perform a POST request
   * @param url
   * @param data
   * @param config
   * @returns
   */
  post(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.instance.post(url, data, config);
  }

  /**
   * Perform a PUT request
   * @param url
   * @param data
   * @param config
   * @returns
   */
  put(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.instance.put(url, data, config);
  }

  /**
   * Perform a DELETE request
   * @param url
   * @param config
   * @returns
   */
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.delete(url, config);
  }
}
