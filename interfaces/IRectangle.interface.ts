import mongoose from "mongoose";

export namespace IRectangle {
  export interface IRectangleDetail {
    owner?: mongoose.Schema.Types.ObjectId | string;
    mainHeight: number;
    _id?: string;
    mainWidth: number;
    columnCount: number;
    rowCount: number;
    columnWidths: number[];
    rowHeights: number[];
    imagesData: {
      index: number;
      file: string;
    }[];
    createdAt?: number;
  }
}
