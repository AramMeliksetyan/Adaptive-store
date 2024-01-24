import { Box, CircularProgress } from "@mui/material";
export const FallbackSpinner = (
  <Box
    sx={{
      display: "flex",
      height: "100dvh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);
