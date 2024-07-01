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
    name: string().required(),
    email: string().email().required(),
    password: string().required(),
    retype_password: string().required(),
  });

  try {
    const validated = await schema.validate(body, { strict: true });
    // this is for sample response
    // return getSuccessResponse({
    //   user: {
    //     id: 1,
    //     name: 'Admin',
    //     email: 'admin@example.com'
    //   },
    // });
    const url = new URL(`${process.env.BACKEND_URL ?? ''}/auth/register`);
    const { retype_password, ...formData } = validated; 
    const response = await fetch(
      url.toString(),
      {
        method: 'POST',
        body: JSON.stringify({ ...formData }),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      const jsonResponse = await response.json();
      return getSuccessResponse(jsonResponse);
    }
    console.log(await response.json());
    throw new HttpException(response.status, response.statusText);
  } catch (e) {
    return getErrorResponse(e);
  }
}