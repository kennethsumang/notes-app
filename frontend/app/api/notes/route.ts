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
    // sample data
    // return getSuccessResponse([
    //   {
    //     id: 'e13ae390-3400-4370-88c0-fd7e797e26c7',
    //     user_id: 1,
    //     title: 'New Note',
    //     content:
    //       '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, World!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    //     parent: null,
    //   },
    //   {
    //     id: '7879a672-afe2-4a74-8cd9-3a69d732598e',
    //     user_id: 1,
    //     title: 'New Note 2',
    //     content:
    //       '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, React!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    //     parent: null,
    //     children: [
    //       {
    //         id: 'a2a87da3-4084-4259-ab6e-516ff36ddff4',
    //         user_id: 1,
    //         title: 'New Child Note',
    //         content:
    //           '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a child note!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    //         parent: '7879a672-afe2-4a74-8cd9-3a69d732598e',
    //       },
    //     ],
    //   },
    // ]);
  } catch (e) {
    return getErrorResponse(e);
  }
}
