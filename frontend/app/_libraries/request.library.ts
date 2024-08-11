import HttpException from '../_exceptions/http.exception';

interface RequestParams {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
}

/**
 * RequestLibrary class
 * @author Kenneth Sumang
 */
export default class RequestLibrary {
  /**
   * Execute an HTTP Request
   * @param {string}        baseUrl
   * @param {RequestParams} requestParams
   * @returns {Promise<SuccessResponse<T> | ErrorResponse>}
   */
  static request = async <T>(
    baseUrl: string,
    requestParams: RequestParams,
  ): Promise<T> => {
    const params = requestParams.params ?? undefined;
    const body = requestParams.data ?? undefined;
    const requestInit: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = new URL(baseUrl);

    if (params) {
      for (const key in params) {
        url.searchParams.append(key, params[key]);
      }
    }

    if (body) {
      requestInit.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    requestInit.method = requestParams.method;
    const response = await fetch(url.toString(), {
      method: requestInit.method,
      body: requestInit.body,
      headers: requestInit.headers,
    });

    if (response.status !== 200 && response.status !== 201) {
      throw new HttpException(response.status, response.statusText);
    }

    return (await response.json()) as T;
  };
}
