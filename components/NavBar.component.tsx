"use client";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { Provider } from "next-auth/providers";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import React, { memo, useEffect, useState } from "react";

const settings = ["Logout"];

function NavBar() {
  const [providers, setProviders] = useState<any>();
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      signOut();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            container
            item
            justifyContent="space-between"
            direction="row"
            sx={{ flexGrow: 0 }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Custom Box
            </Typography>

            {session?.user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={session.user.name ?? "Avatar"}
                      src={session.user.image ?? ""}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {providers &&
                  Object.values(providers as Provider[]).map((provider) => (
                    <Button
                      variant="contained"
                      color="warning"
                      key={provider.name}
                      onClick={() => {
                        signIn(provider.id);
                      }}
                      className="black_btn"
                    >
                      Sign in with Google
                    </Button>
                  ))}
              </>
            )}
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default memo(NavBar);
