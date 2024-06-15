"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AdbIcon from "@mui/icons-material/Adb";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ButtonBase from "@mui/material/ButtonBase";
import ExpandLess from "@mui/icons-material/ChevronRight";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useSettings } from "@/contexts/SettingsContext";
import { merge, Menu } from "@/menus";
import { useMenus } from "@/contexts/MenusContext";
import Link from "@mui/material/Link";
import NextLink from "next/link";

function SidebarToggleButton({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: (open: boolean) => void;
}) {
  return (
    <ButtonBase
      sx={{
        left: open? 88:12,
        borderRadius: "50%",
        height: 24,
        width: 24,
        borderWidth: 1,
        borderStyle: "solid",
        cursor: "pointer",
        borderColor: (t) => t.palette.divider,
        background: (t) => t.palette.background.paper,
      }}
      onClick={() => {
        toggleSidebar(!open);
      }}
    >
      {open ? (
        <ChevronLeft sx={{ width: 24, height: 24 }} color="primary" />
      ) : (
        <ChevronRight sx={{ width: 24, height: 24 }} color="primary" />
      )}
    </ButtonBase>
  );
}

function MenuNav({
  menu,
  isRoot = false,
  includeRoot = false,
  level = 0,
  toggleCollapse,
  stretch = false,
}: {
  menu?: Menu;
  isRoot?: boolean;
  includeRoot?: boolean;
  level: number;
  stretch?: boolean;
  toggleCollapse: (code: string) => void;
} & React.PropsWithChildren) {
  if (!menu) {
    return null;
  }
  const { menuStates } = useMenus();

  if (!includeRoot) {
    return (
      <>
        {menu.children &&
          menu.children.map((v) => (
            <MenuNav
              toggleCollapse={toggleCollapse}
              level={level}
              isRoot
              menu={v}
              stretch={stretch}
              includeRoot
            />
          ))}
      </>
    );
  } else {
    const __render = () => {
      const isCollapse = menu.children && menu.children.length > 0;
      return (
        <>
          <Link
            component={NextLink}
            underline="none"
            href={menu.path}
            onClick={(e) => {
              if (isCollapse) {
                e.preventDefault();
              }
            }}
          >
            <ListItemButton
              sx={{ pl: stretch ? 2 + 3 * level : 1, pr: 0 }}
              onClick={(e) => {
                if (isCollapse) {
                  toggleCollapse(menu.code);
                }
              }}
            >
              <Box
                display={stretch ? "inherit" : "flex"}
                flexDirection={stretch ? "row" : "column"}
                justifyContent={stretch ? "flex-start" : "center"}
                alignItems={"center"}
                width={"100%"}
              >
                <ListItemIcon>
                  {/* <StarBorder
                    sx={{ width: 24, height: 24, mr: stretch ? 1 : 0 }}
                  /> */}
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    maxWidth: stretch ? 1000 : 60,
                    display: "flex",
                    "& > span": {
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      width: "100%",
                      textOverflow: "ellipsis",
                      letterSpacing: ".2rem",
                      overflow: "hidden",
                      textAlign: "start",
                    },
                  }}
                  primary={menu.name}
                ></ListItemText>
              </Box>
              {isCollapse ? (
                menuStates[menu.code] && menuStates[menu.code].open ? (
                  <ExpandMore />
                ) : (
                  <ExpandLess />
                )
              ) : null}
            </ListItemButton>
          </Link>
          {menu.children ? (
            <Collapse
              orientation={"vertical"}
              in={menuStates[menu.code] && menuStates[menu.code].open}
              timeout={1000}
            >
              <List sx={{ px: 0, py: 0 }}>
                {menu.children.map((v) => (
                  <MenuNav
                    toggleCollapse={toggleCollapse}
                    level={level + 1}
                    menu={v}
                    stretch={stretch}
                    includeRoot
                  />
                ))}
              </List>
            </Collapse>
          ) : null}
        </>
      );
    };
    if (!isRoot) {
      return <__render />;
    } else {
      return (
        <List sx={{ p: stretch ? 1 : 0.5 }}>
          <__render />
        </List>
      );
    }
  }
}
export default function () {
  const {
    layout,
    changeLayout,
    debug,
    changeDebug,
    sidebarOpen,
    changeSidebar,
  } = useSettings();
  const { menus, toggleCollapse } = useMenus();
  const _menus = merge(menus);
  return (
    <Box
      sx={{
        width: sidebarOpen ? "300px" : "100px",
        height: "100%",
        flexShrink: 0,
        position: "fixed",
        zIndex: 100000,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        position={"fixed"}
        height={"100%"}
        sx={{
          width: sidebarOpen ? "300px" : "100px",
          background: (t) => t.palette.background.paper,
          borderRight: "1px solid #c1c1c1",
        }}
      >
        <Box sx={{ p: 2 }} display="flex" justifyContent="center">
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
          <SidebarToggleButton
            open={sidebarOpen}
            toggleSidebar={changeSidebar}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: !sidebarOpen ? "column" : "row",
            p: 2,
            gap: 1,
            border: "1px solid black",
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => changeLayout(layout == "h" ? "v" : "h")}
          >
            Layout ({`${layout}`})
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => changeDebug(!debug)}
          >
            Debug ({`${debug}`})
          </Button>
        </Box>
        <MenuNav
          toggleCollapse={toggleCollapse}
          menu={_menus}
          level={0}
          stretch={sidebarOpen}
          isRoot
          includeRoot={false}
        />
      </Box>
    </Box>
  );
}
