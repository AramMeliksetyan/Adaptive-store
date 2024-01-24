import { ToggleButton, styled } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)(({ theme }) =>
  theme.unstable_sx({
    color: "primary.main",
    border: "1px solid",
    backgroundColor: "white",
    borderColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.light",
      color: "white",
    },
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "white",
      "&:hover": {
        backgroundColor: "primary.light",
        color: "white",
      },
    },
  })
);

export default StyledToggleButton;
