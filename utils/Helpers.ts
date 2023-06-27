import dayjs from "dayjs";

dayjs.locale("tr");
export const Helpers = {
  Date(date: Date | number | string, format = "D/MM/YYYY HH:mm") {
    if (!date) {
      return;
    }
    return dayjs(date).format(format);
  },
};
