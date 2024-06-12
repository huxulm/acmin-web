"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MenusApi, Configuration } from "@/api";
import { Loading, LoadingWrapper } from "@/components/Loading";
import delay from "@/utils/delay";

const api = new MenusApi(new Configuration({ basePath: "" }));

function MenusList() {
  const { data, isFetching, isLoading } = useSuspenseQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      // return (await delay(api.v1MenusGet(0, 0, 20, true, {}), 100)).data.data;
      return (await api.v1MenusGet(0, 0, 20, true, {})).data.data;
    },
    gcTime: 30000,
    refetchOnWindowFocus: true,
  });
  if (isFetching || isLoading) {
    return (
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
    );
  }
  return (
    <Paper sx={{ p: 2 }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Paper>
  );
}
export default function () {
  return (
    <LoadingWrapper>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <MenusList />
        </Box>
      </Container>
    </LoadingWrapper>
  );
}
