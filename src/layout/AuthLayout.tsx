import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      <Box sx={{ minHeight: "100dvh" }}>
        <Outlet />
      </Box>
    </main>
  );
};

export default AuthLayout;
