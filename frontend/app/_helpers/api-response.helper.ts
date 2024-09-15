import HttpException from '../_exceptions/http.exception';
import { ValidationError } from 'yup';
import UnauthorizedException from '../_exceptions/unauthorized.exception';

export function getErrorResponse(e: unknown): Response {
  if (e instanceof UnauthorizedException) {
    const error = e as HttpException;
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      {
        status: error.code,
        statusText:
          "Oops! It seems you don't have the necessary permissions to access this resource. Please check your credentials or contact the administrator for assistance.",
      },
    );
  }

  if (e instanceof HttpException) {
    const error = e as HttpException;
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      {
        status: error.code,
        statusText:
          'Oops! Something went wrong. We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team for assistance.',
      },
    );
  }

  if (e instanceof ValidationError) {
    const error = e as ValidationError;
    return Response.json(
      {
        error: {
          code: 400,
          message: error.message,
        },
      },
      {
        status: 400,
        statusText:
          'Validation Error. It looks like some of the information you entered is incorrect. Please check your input and try again.',
      },
    );
  }

  return Response.json(
    {
      error: {
        code: 500,
        message: (e as Error).message,
      },
    },
    {
      status: 500,
      statusText:
        'Oops! Something went wrong. An unexpected error occurred on our end. Please refresh the page and try again. If the problem continues, contact our support team for help.',
    },
  );
}

export function getSuccessResponse(
  data: unknown,
  metadata: Record<string, unknown> = {},
) {
  return Response.json(
    {
      data,
      metadata,
    },
    {
      status: 200,
      statusText: 'OK',
    },
  );
}
