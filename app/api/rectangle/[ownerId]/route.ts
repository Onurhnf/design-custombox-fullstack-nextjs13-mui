import Rectangle from "@/models/rectangle.schema";
import { connectToDB } from "@/utils/database";

export const GET = async (request: Request, { params }: any) => {
  try {
    await connectToDB();

    const { ownerId: owner } = params;

    const rectangles = await Rectangle.find({ owner });

    if (rectangles.length > 0) {
      return new Response(JSON.stringify(rectangles), { status: 200 });
    } else {
      return new Response("No saved rectangles found", { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to get rectangles", { status: 500 });
  }
};
