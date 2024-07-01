import { getSuccessResponse } from "@/app/_helpers/api-response.helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  // sample response
  switch (id) {
    case 'e13ae390-3400-4370-88c0-fd7e797e26c7':
      return getSuccessResponse({
        id: 'e13ae390-3400-4370-88c0-fd7e797e26c7',
        user_id: 1,
        title: 'New Note',
        content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, World!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
        parent: null,
      });
    case '7879a672-afe2-4a74-8cd9-3a69d732598e':
      return getSuccessResponse({
        id: '7879a672-afe2-4a74-8cd9-3a69d732598e',
        user_id: 1,
        title: 'New Note 2',
        content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hello, React!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
        parent: null,
      });
    case 'a2a87da3-4084-4259-ab6e-516ff36ddff4':
      return getSuccessResponse({
        id: 'a2a87da3-4084-4259-ab6e-516ff36ddff4',
        user_id: 1,
        title: 'New Child Note',
        content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"This is a child note!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
        parent: '7879a672-afe2-4a74-8cd9-3a69d732598e',
      });
  }
}