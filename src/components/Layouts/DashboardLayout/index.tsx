"use client";
import Box from "@mui/material/Box";
import { Suspense, lazy } from "react";
// import Navbar from "@/components/Navbar/Vertical";
import Fullscreen from "@/components/Loading/Fullscreen";
import { useSettings } from "@/contexts/SettingsContext";
import "./globals.css";
import delay from "@/utils/delay";
import Button from "@mui/material/Button";
import HeadBar from "@/components/HeadBar";

// lazy import will activate Suspense
const Navbar = lazy(() => delay(import("@/components/Navbar/Vertical"), 1500));

export default function ({ children }: React.PropsWithChildren) {
  const { debug, sidebarOpen } = useSettings();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        "*": {
          outline: debug ? "1px dashed gold" : "none",
        },
      }}
    >
      <Suspense fallback={<Fullscreen />}>
        {/* side nav */}

        <Navbar />
        <HeadBar sidebarOpen={sidebarOpen} />
        {/* content */}
        <Box
          sx={{
            height: "100%",
            minHeight: "100vh",
            width: "100%",
            padding: `88px 16px`,
          }}
        >
          {children}
        </Box>
      </Suspense>
    </Box>
  );
}
