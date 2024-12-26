export interface IAxiosResponseFail {
  status: number;
  message: string;
}

export interface IAxiosResponseSuccess<T = unknown> {
  status: number;
  message: string;
  data: T;
}
