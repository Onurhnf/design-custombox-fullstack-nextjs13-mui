import { IRectangle } from "@/interfaces/IRectangle.interface";
import mongoose, { Schema, model, models } from "mongoose";

const RectangleSchema = new Schema<IRectangle.IRectangleDetail>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Rectangle must belong to a User"],
  },
  mainHeight: {
    type: Number,
    required: [true, "Rectangle must have a Main Height"],
  },
  mainWidth: {
    type: Number,
    required: [true, "Rectangle must have a Main Width"],
  },
  columnCount: {
    type: Number,
    required: [true, "Rectangle must have a Column Count"],
  },
  rowCount: {
    type: Number,
    required: [true, "Rectangle must have a Row Count"],
  },
  columnWidths: {
    type: [Number],
    required: [true, "Rectangle's columns must have an array of widths"],
  },
  rowHeights: {
    type: [Number],
    required: [true, "Rectangle's rows must have an array of heights"],
  },
  imagesData: [
    {
      index: {
        type: Number,
        required: true,
      },
      file: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const Rectangle =
  models.Rectangle ||
  model<IRectangle.IRectangleDetail>("Rectangle", RectangleSchema);

export default Rectangle;
