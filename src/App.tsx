import { RouterProvider } from "react-router-dom";
import CreateRoutes from "./routes";
import { ThemeProvider, createTheme } from "@mui/material";
import { toastOptions } from "./resources/constants";
import { Toaster } from "react-hot-toast";

function App() {
  const router = CreateRoutes();
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" toastOptions={toastOptions} />

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
