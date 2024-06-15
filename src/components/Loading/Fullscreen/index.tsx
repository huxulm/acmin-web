import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Loader from "./loader";
import { useEffect, useState } from "react";

export default function ({ color = "#cfc1d5" }: { color?: string }) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(217deg, rgba(255,0,0,.2), rgba(255,0,0,0) 70.71%),
      linear-gradient(127deg, rgba(0,255,0,.2), rgba(0,255,0,0) 70.71%),
      linear-gradient(336deg, rgba(0,0,255,.2), rgba(0,0,255,0) 70.71%)`,
        position: "relative",
      }}
      display={"flex"}
      flexDirection={"column"}
      position={"relative"}
    >
      {progress < 100 && <LinearProgress
        value={progress}
        variant="determinate"
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: 4,
          "&.MuiLinearProgress-root": {
            background: "transparent",
          },
          ".MuiLinearProgress-bar": {
            backgroundColor: color,
          },
        }}
      />}
      <Box
        display={"flex"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Loader color={color} />
      </Box>
    </Box>
  );
}
