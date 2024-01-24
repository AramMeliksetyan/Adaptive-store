import { Box, Drawer, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import { RIGHT_SIDEBAR_WIDTH } from "resources/constants";

export interface IRightDrawerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  title: string;
  children: ReactNode;
  width?: number;
  onClose?: () => void;
}

const RightDrawer = ({
  open,
  setOpen,
  title,
  onClose,
  children,
  width = RIGHT_SIDEBAR_WIDTH,
}: IRightDrawerProps) => {
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Drawer anchor={"right"} open={open} onClose={handleClose}>
      <Box p={2} width={width}>
        <Box mt={2} mb={4} display="flex" justifyContent={"space-between"}>
          <Typography variant="h6" fontWeight={500}>
            {title}
          </Typography>
          <Box sx={{ cursor: "pointer" }}>
            <CloseIcon onClick={handleClose} />
          </Box>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
};

export default RightDrawer;
