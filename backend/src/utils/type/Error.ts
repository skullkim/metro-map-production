export interface ReqError extends Error {
  [key: string]: any;
}

export class HttpException extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
