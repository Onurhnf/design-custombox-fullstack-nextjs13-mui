import { Endpoints } from "@/enums/api/Endpoints";
import { IRectangle } from "@/interfaces/IRectangle.interface";
import Http from "@/utils/Http";

const RectangleService = {
  NewRectangle: async (
    newRectangleData: IRectangle.IRectangleDetail
  ): Promise<{ data: IRectangle.IRectangleDetail }> => {
    const result = await Http.POST(Endpoints.NewRectangle, newRectangleData);
    return result;
  },
  GetAll: async (
    ownerId: string
  ): Promise<{ data: IRectangle.IRectangleDetail[] }> => {
    const endpoint = Endpoints.GetAllRectangles.replace(":ownerId", ownerId);
    const result = await Http.GET(endpoint);
    return result;
  },
};

export default RectangleService;
