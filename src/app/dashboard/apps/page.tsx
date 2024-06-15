import { LoadingWrapper } from "@/components/Loading";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function () {
  return (
    <LoadingWrapper>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%" }}>
          <>apps list...</>
        </Box>
      </Container>
    </LoadingWrapper>
  );
}
