import HttpException from '@/app/_exceptions/http.exception';
import UnauthorizedException from '@/app/_exceptions/unauthorized.exception';
import {
  getErrorResponse,
  getSuccessResponse,
} from '@/app/_helpers/api-response.helper';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';
import { number, object, string } from 'yup';
import { getDecryptedCookie } from '../_libraries/cookie.library';

/**
 * POST request handler
 * @author Kenneth Sumang
 */
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const token = getDecryptedCookie('token');
  const schema = object({
    title: string().required(),
    content: string().required(),
    parent: string().optional(),
  });

  try {
    if (!token) {
      throw new UnauthorizedException();
    }

    const validated = await schema.validate(body, { strict: true });
    const url = new URL(`${process.env.BACKEND_URL ?? ''}/notes`);
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(validated),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      const jsonResponse = await response.json();
      return getSuccessResponse(jsonResponse);
    }

    throw new HttpException(response.status, response.statusText);
  } catch (e) {
    return getErrorResponse(e);
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const token = getDecryptedCookie('token');

  try {
    if (!token) {
      throw new UnauthorizedException();
    }

    const url = new URL(`${process.env.BACKEND_URL ?? ''}/notes`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const jsonResponse = await response.json();
      return getSuccessResponse(jsonResponse);
    }

    throw new HttpException(response.status, response.statusText);
  } catch (e) {
    return getErrorResponse(e);
  }
}
