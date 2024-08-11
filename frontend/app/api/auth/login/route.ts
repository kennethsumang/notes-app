import HttpException from '@/app/_exceptions/http.exception';
import {
  getErrorResponse,
  getSuccessResponse,
} from '@/app/_helpers/api-response.helper';
import { AuthApiResponse } from '@/app/_types/auth';
import { NextRequest, NextResponse } from 'next/server';
import { object, string } from 'yup';
import { setEncryptedCookie } from '../../_libraries/cookie.library';

/**
 * POST request handler
 * @author Kenneth Sumang
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const schema = object({
    email: string().email().required(),
    password: string().required(),
  });

  try {
    const validated = await schema.validate(body, { strict: true });

    const url = new URL(`${process.env.BACKEND_URL ?? ''}/auth/login`);
    const credentials = {
      email: validated.email,
      password: validated.password,
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const jsonResponse = (await response.json()) as AuthApiResponse;
      const accessToken = jsonResponse.accessToken;
      setEncryptedCookie('token', accessToken);
      return getSuccessResponse(jsonResponse);
    }

    throw new HttpException(response.status, response.statusText);
  } catch (e) {
    return getErrorResponse(e);
  }
}
