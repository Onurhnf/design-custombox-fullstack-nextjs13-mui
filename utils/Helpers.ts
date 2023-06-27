import { Breakpoint, Theme, useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";

dayjs.locale("tr");
export const Helpers = {
  /**
   *
   * @param date
   * @param format
   * @returns date format
   */
  Date(date: Date | number | string, format = "D/MM/YYYY HH:mm") {
    if (!date) {
      return;
    }
    return dayjs(date).format(format);
  },
  /**
   *
   * @param direction "down" | "up"
   * @param category "xs" | "sm" | "md" | "lg" | "xl"
   * @return media query to detect window size
   */
  useMediaQuery: (direction: "down" | "up", category: Breakpoint) => {
    if (!direction || !category) {
      throw Error("parameters are missing...");
    }
    const theme = useTheme<Theme>();
    return useMediaQuery(theme.breakpoints[direction](category));
  },
};
