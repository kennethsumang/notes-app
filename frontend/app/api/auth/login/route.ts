import HttpException from "@/app/_exceptions/http.exception";
import { getErrorResponse, getSuccessResponse } from "@/app/_helpers/api-response.helper";
import { NextRequest, NextResponse } from "next/server";
import { object, string } from "yup";

/**
 * POST request handler
 * @author Kenneth Sumang
 */
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const schema = object({
    email: string().email().required(),
    password: string().required(),
  });

  try {
    const validated = await schema.validate(body, { strict: true });
    // this is for sample API response
    return  getSuccessResponse(({
      user: {
        id: 1,
        name: 'Admin',
        email: 'admin@example.com',
        email_verified_at: Date.now().toString(),
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.1Jy-gGjEJVq6me2f6YMguG5Pgjtmgkw1E7Qucttkbbs',
    }));

    const url = new URL(`${process.env.BACKEND_URL ?? ''}/login`);
    const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      }
    );

    if (response.status === 200) {
      const jsonResponse = await response.json();
      return getSuccessResponse(jsonResponse);
    }

    throw new HttpException(response.status, response.statusText);
  } catch (e) {
    return getErrorResponse(e);
  }
}