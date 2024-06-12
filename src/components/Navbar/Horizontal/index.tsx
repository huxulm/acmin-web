"use client";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";

import { usePathname } from "next/navigation";
import Link from "@mui/material/Link";
import NextLink from "next/link";

import AdbIcon from "@mui/icons-material/Adb";

import { useAuthState, useAuthDispatch } from "@/contexts/AuthContext";
import ButtonBase from "@mui/material/ButtonBase";

export default function Navbar() {
  const pathname = usePathname();
  const { isLogin } = useAuthState();
  const { onLogout } = useAuthDispatch();

  const navigate = (href: string) => {
    window.location.href = href;
  }

  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ px: { xs: 0, md: 2 } }}>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
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
          ACMIN
        </Typography>

        <Box sx={{ flexGrow: 1, paddingLeft: 4, columnGap: 5, display: { xs: "none", md: "flex" } }}>
          <Link sx={{ mx: 2 }} color="secondary" href="/" component={NextLink}>
            Home
          </Link>
          <Link sx={{ mx: 2 }} color="secondary" href={"/dashboard/zone1"} component={NextLink}>
            Zone1
          </Link>
          {isLogin && (
            <Link sx={{ mx: 2 }} color="secondary" href="/dashboard" component={NextLink}>
              Dashboard
            </Link>
          )}
          {isLogin && (
            <Link sx={{ mx: 2 }} color="secondary">
              <a
                className={`link ${pathname === "/logout" ? "active" : ""}`}
                onClick={onLogout}
              >
                Logout
              </a>
            </Link>
          )}
          {!isLogin && (
            <Link sx={{ mx: 2 }} color="secondary" href="/login"  component={NextLink}>
              Login
            </Link>
          )}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton sx={{ p: 1 }}>
            <SettingsIcon />
          </IconButton>
          <Tooltip title="Open settings">
            <IconButton>
              <Avatar alt="Remx Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
