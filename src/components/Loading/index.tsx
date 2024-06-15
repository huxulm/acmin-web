import React, { Suspense } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { usePathname } from "next/navigation";

const Loading = ({
  center = false,
  loaderProps = {},
  ...props
}: BoxProps & {
  center?: boolean;
  loaderProps?: LinearProgressProps;
}) => {
  if (center) {
    return (
      <Box {...props}>
        <LinearProgress {...loaderProps} />
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress {...loaderProps} />
    </Box>
  );
};

const LoadingWrapper = ({ children }: React.PropsWithChildren) => {
  return (
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
        ></Loading>
      }
    >
      {children}
    </Suspense>
  );
};
export { Loading, LoadingWrapper };
