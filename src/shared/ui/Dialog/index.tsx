import {
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Divider,
  SxProps,
} from "@mui/material";
import CrossIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

export interface ISharedDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  textConfig: {
    title: string;
    description?: string;
  };
  hasActions?: boolean;
  onSuccess?: () => void;
  children?: ReactNode;
  minWidth?: string;
  handleCloseCb?: () => void;
  fullScreen?: boolean;
  sx?: SxProps<any>;
}

const SharedDialog = ({
  open,
  setOpen,
  textConfig: { title, description },
  onSuccess,
  hasActions = true,
  children,
  minWidth,
  handleCloseCb = undefined,
  fullScreen = false,
  sx,
}: ISharedDialogProps) => {
  const handleSubmit = () => {
    onSuccess?.();
    setOpen(false);
  };

  const handleClose = () => {
    handleCloseCb?.();
    setOpen(false);
  };

  return (
    <Dialog
      sx={sx}
      open={open}
      onClose={handleClose}
      PaperComponent={Paper}
      fullScreen={fullScreen}
    >
      <Box
        minWidth={minWidth}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <DialogTitle style={{ cursor: "move" }}>{title}</DialogTitle>
        <Box mr={2}>
          <Button onClick={handleClose}>
            <CrossIcon />
          </Button>
        </Box>
      </Box>
      <Divider />
      <DialogContent>
        {description ? (
          <DialogContentText>{description}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      {hasActions ? (
        <>
          <Divider />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
};

export default SharedDialog;
