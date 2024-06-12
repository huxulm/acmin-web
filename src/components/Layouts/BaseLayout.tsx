"use client";
import Box from "@mui/material/Box";
import { Suspense } from "react";
import { Loading } from "@/components/Loading";
import Navbar from "@/components/Navbar/Vertical";
import { useSettings } from "@/contexts/SettingsContext";
import "./globals.css";

function delayForDemo(promise: Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  }).then(() => promise);
}

export default function ({ children }: React.PropsWithChildren) {
  const { debug } = useSettings();
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row",
      height: "100%",
      width: "100%",
      "*": {
        outline: debug ? "1px dashed gold" : "none",
      },      
    }}>
      {/* side nav */}
      <Box>
        <Navbar />
      </Box>
      <Suspense
        fallback={
          <Loading
            center
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              p: {
                xs: 5,
              },
            }}
            loaderProps={{
              color: "success",
              sx: {
                width: {
                  xl: "200px",
                  lg: "200px",
                  md: "200px",
                  xs: "100%",
                },
              },
            }}
          />
        }
      >
        {/* content */}
        <Box
          sx={{
            height: "100%",
            minHeight: "100vh",
            width: "100%",
            p: {
              xs: 0,
              md: 5,
            },
          }}
        >
          {children}
        </Box>
      </Suspense>
    </Box>
  );
}
