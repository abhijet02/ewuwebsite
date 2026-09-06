interface DataResponse<T> {
  items?: Array<T>;
}

export interface OriginalErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
interface ExtensionsResponse {
  code: string;
  originalError: OriginalErrorResponse;
}

interface StatusResponse {
  message?: string;
  extensions?: ExtensionsResponse;
}

export interface Response<T = any> {
  data?: T;
  errors?: Array<StatusResponse>;
}
