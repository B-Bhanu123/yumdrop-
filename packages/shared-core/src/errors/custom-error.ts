export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string; errorCode?: string }[];
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public resourceName: string = 'Resource') {
    super(`${resourceName} not found`);
  }

  serializeErrors() {
    return [{ message: `${this.resourceName} not found`, errorCode: 'NOT_FOUND' }];
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message: string, public field?: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message, field: this.field, errorCode: 'BAD_REQUEST' }];
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string = 'Not Authorized') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message, errorCode: 'UNAUTHORIZED' }];
  }
}

export class ForbiddenError extends CustomError {
  statusCode = 403;

  constructor(message: string = 'Permission Denied') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message, errorCode: 'FORBIDDEN' }];
  }
}

export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message, errorCode: 'CONFLICT' }];
  }
}

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(message: string = 'Internal Server Error') {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message, errorCode: 'INTERNAL_SERVER_ERROR' }];
  }
}
