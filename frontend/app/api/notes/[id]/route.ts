import {
  getErrorResponse,
  getSuccessResponse,
} from '@/app/_helpers/api-response.helper';
import { NextRequest, NextResponse } from 'next/server';
import { getDecryptedCookie } from '../../_libraries/cookie.library';
import UnauthorizedException from '@/app/_exceptions/unauthorized.exception';
import HttpException from '@/app/_exceptions/http.exception';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  const token = getDecryptedCookie('token');

  try {
    if (!token) {
      throw new UnauthorizedException();
    }

    const url = new URL(`${process.env.BACKEND_URL ?? ''}/notes/${id}`);
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
