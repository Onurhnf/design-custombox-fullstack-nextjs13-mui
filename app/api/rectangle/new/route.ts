import Rectangle from "@/models/rectangle.schema";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { stat, mkdir } from "fs/promises";
import { IRectangle } from "@/interfaces/IRectangle.interface";
import sharp from "sharp";

export const POST = async (request: NextRequest, response: Response) => {
  try {
    await connectToDB();
    const formData = await request.formData();

    const object: IRectangle.IRectangleDetail =
      {} as IRectangle.IRectangleDetail;
    const uploadDir = join(process.cwd(), "public");

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    for (const [key, value] of Array.from(formData.entries())) {
      if (key.startsWith("imagesData")) {
        const match = key.match(/imagesData\[(\d+)\]/);
        if (match) {
          const index = Number(match[1]);
          object.imagesData = object.imagesData || [];

          const uniqueSuffix = `${object.owner}-${Date.now()}-${Math.round(
            Math.random() * 1e9
          )}`;
          const filename = `${uniqueSuffix}.jpeg`;
          //if value is string means that the file already uploaded so do not create new one
          object.imagesData.push({
            index,
            file: typeof value === "string" ? value : filename,
          });

          const file = value as Blob;
          if (typeof value === "string") continue; //skip creating file because already exist
          const buffer = Buffer.from(await file.arrayBuffer());

          try {
            // configure file and write to disk
            sharp(buffer)
              .resize(300, 300, {
                fit: "inside",
                withoutEnlargement: true,
              })
              .toFormat("jpeg")
              .jpeg({ quality: 90 })
              .toFile(`${uploadDir}/${filename}`);
          } catch (e) {
            console.error("Error while trying to upload a file\n", e);
            return NextResponse.json(
              { error: "Something went wrong." },
              { status: 500 }
            );
          }
        }
      } else if (
        ["columnCount", "rowCount", "mainHeight", "mainWidth"].includes(key)
      ) {
        (object as any)[key] = Number(value);
      } else if (["columnWidths", "rowHeights"].includes(key)) {
        (object as any)[key] = JSON.parse(value as any);
      } else {
        (object as any)[key] = value;
      }
    }

    const newRectangle = new Rectangle({ ...object });
    await newRectangle.save();

    return new Response(JSON.stringify(newRectangle), { status: 201 });
  } catch (error) {
    return new Response("Failed to create rectangle", { status: 500 });
  }
};
