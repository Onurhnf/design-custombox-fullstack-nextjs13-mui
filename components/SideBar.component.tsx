"use client";
import { IRectangle } from "@/interfaces/IRectangle.interface";
import RectangleService from "@/services/Rectangle.service";
import { Helpers } from "@/utils/Helpers";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RectangleProps = {
  rectangle: IRectangle.IRectangleDetail;
  setRectangle: React.Dispatch<IRectangle.IRectangleDetail>;
};

export default function SideBar({ rectangle, setRectangle }: RectangleProps) {
  const { data: session } = useSession();
  const isMdDown = Helpers.useMediaQuery("down", "md");
  const [rectangleList, setRectangleList] = useState<
    IRectangle.IRectangleDetail[]
  >([]);

  useEffect(() => {
    async function handleGetAllRectangles() {
      try {
        const result = await RectangleService.GetAll(session?.user.id ?? "");

        setRectangleList(result.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (session?.user) {
      handleGetAllRectangles();
    }
  }, [session?.user, rectangle]);

  return (
    <Drawer
      sx={{
        width: isMdDown ? "60px" : "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isMdDown ? "60px" : "240px",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <Box
          width={"100%"}
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography fontWeight={"bold"} color="gray">
            History
          </Typography>
        </Box>
        <List>
          {Array.isArray(rectangleList) && rectangleList.length > 0 ? (
            rectangleList
              .sort((a, b) => {
                if (a?.createdAt && b?.createdAt) {
                  return b.createdAt - a.createdAt;
                }
                return 0;
              })
              .map((rectangle, index) => (
                <Box key={rectangle._id} borderBottom={"1px solid #1976D2"}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setRectangle({} as IRectangle.IRectangleDetail);
                        setRectangle(rectangle);
                      }}
                    >
                      <ListItemText
                        secondaryTypographyProps={{ fontWeight: "bold" }}
                        secondary={
                          `•  ` + Helpers.Date(rectangle.createdAt ?? 0)
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </Box>
              ))
          ) : session?.user ? (
            <ListItem disablePadding>
              <ListItemText
                secondaryTypographyProps={{ fontWeight: "bold" }}
                secondary={rectangleList?.toString()}
              />
            </ListItem>
          ) : (
            <Typography>Sign in to see your history</Typography>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
