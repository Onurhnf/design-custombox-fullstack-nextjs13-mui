import axios, {
  Method,
  AxiosHeaders,
  AxiosRequestHeaders,
  RawAxiosRequestHeaders,
} from "axios";

const Http = {
  /**
   * @description HTTP POST
   * @param url
   * @param data
   * @param headers
   * @returns Promise
   */
  POST: async (
    url: string,
    data?: any,
    headers?: RawAxiosRequestHeaders
  ): Promise<any> => {
    const result = await axios({
      url: url,
      method: "post",
      data: data,
      headers: {
        ...headers,
      },
    });

    return result;
  },
  /**
   * @description HTTP PUT
   * @param url
   * @param data
   * @param headers
   * @returns Promise
   */
  PATCH: async (
    url: string,
    data?: any,
    headers?: RawAxiosRequestHeaders
  ): Promise<any> => {
    const result = await axios({
      url: url,
      method: "patch",
      data: data,
      headers: {
        ...headers,
      },
    });

    return result;
  },
  /**
   * @description HTTP DELETE
   * @param url
   * @param data
   * @param headers
   * @returns Promise
   */
  DELETE: async (
    url: string,
    data?: any,
    headers?: RawAxiosRequestHeaders
  ): Promise<any> => {
    const result = await axios({
      url: url,
      method: "delete",
      data: data,
      headers: {
        ...headers,
      },
    });

    return result;
  },
  /**
   * @description HTTP GET
   * @param url
   * @param data
   * @param headers
   * @returns Promise
   */
  GET: async (
    url: string,
    data?: any,
    headers?: RawAxiosRequestHeaders
  ): Promise<any> => {
    const result = await axios({
      url: url,
      method: "get",
      params: data,
      headers: {
        ...headers,
      },
    });
    return result;
  },
  /**
   * @description HTTP UPLOAD FILE
   * @param url
   * @param form
   * @param headers
   * @param method
   * @param onUploadProgress
   * @param onDownloadProgress
   * @returns Promise
   */
  FORM: async (
    url: string,
    form: FormData,
    headers?: AxiosHeaders,
    method?: Method,
    onUploadProgress?: any,
    onDownloadProgress?: any
  ): Promise<any> => {
    const result = await axios({
      url: url,
      method: method || "post",
      data: form,
      headers: {
        ...headers,
      },
      onDownloadProgress: onDownloadProgress,
      onUploadProgress: onUploadProgress,
    });

    return result;
  },
};

export default Http;
