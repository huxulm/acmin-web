"use client";
import { useAuthState } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { MenusContext } from "@/contexts/MenusContext";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import MenuTreeView from "../MenuTreeView";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function HomeContent() {
  const { isLogin } = useAuthState();
  const { menus } = useContext(MenusContext);
  return (
    <div className="home">
      {isLogin && <div>Yeah!Now you are logged in</div>}
      {!isLogin && (
        <div>
          {`Haven't login, Go to`} <Link href="/login">Login</Link>
        </div>
      )}

      <Container maxWidth={"xl"} sx={{ p: 2 }}>
        <Box sx={{ width: "100%", height: 1200 }}>
          {menus && (
            <ParentSize>
              {({ height, width }) => (
                <MenuTreeView width={width} height={height} menu={menus} />
              )}
            </ParentSize>
          )}
        </Box>
      </Container>
    </div>
  );
}
