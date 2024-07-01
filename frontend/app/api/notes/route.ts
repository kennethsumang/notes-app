import HttpException from "@/app/_exceptions/http.exception";
import { getErrorResponse, getSuccessResponse } from "@/app/_helpers/api-response.helper";
import { NextRequest, NextResponse } from "next/server";
import { ValidationError, number, object, string } from "yup";

/**
 * POST request handler
 * @author Kenneth Sumang
 */
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const schema = object({
    title: string().required(),
    content: string().required(),
    user_id: number().required(),
  });

  try {
    const validated = await schema.validate(body, { strict: true });
    // sample data
    return getSuccessResponse({
      id: 'e13ae390-3400-4370-88c0-fd7e797e26c7',
      user_id: 1,
      title: 'New Note',
      content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, World!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
    });
  } catch (e) {
    return getErrorResponse(e);
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const user_id = Number(searchParams.get('user_id'));
  const schema = object({
    user_id: number().required(),
  });
  const params = {
    user_id: user_id
  };

  try {
    const validated = await schema.validate(params, { strict: true });
    // sample data
    return getSuccessResponse([
      {
        id: 'e13ae390-3400-4370-88c0-fd7e797e26c7',
        user_id: 1,
        title: 'New Note',
        content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, World!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
        parent: null,
      },
      {
        id: '7879a672-afe2-4a74-8cd9-3a69d732598e',
        user_id: 1,
        title: 'New Note 2',
        content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, React!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
        parent: null,
        children: [
          {
            id: 'a2a87da3-4084-4259-ab6e-516ff36ddff4',
            user_id: 1,
            title: 'New Child Note',
            content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a child note!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            parent: '7879a672-afe2-4a74-8cd9-3a69d732598e',
          }
        ]
      },
    ])
  } catch (e) {
    return getErrorResponse(e);
  }
}