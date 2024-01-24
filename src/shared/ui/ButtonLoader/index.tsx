import { Button, LinearProgress } from "@mui/material";
import { memo } from "react";

type ButtonSize = "small" | "medium" | "large";

interface IButtonProps {
  color?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading: boolean;
  variant?: "contained" | "text" | "outlined";
  children: JSX.Element;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick: () => void | Promise<void>;
  form?: string;
  size?: ButtonSize;
}

const ButtonLoader = ({
  color,
  disabled,
  fullWidth,
  isLoading,
  children,
  type,
  className,
  onClick,
  variant = "contained",
  form,
  size = "medium",
}: IButtonProps): JSX.Element => {
  return (
    <Button
      form={form}
      color={color}
      variant={variant}
      size={size}
      className={`${className}`}
      disabled={isLoading || disabled}
      fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      {children}

      {isLoading && (
        <LinearProgress
          color="primary"
          sx={{
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
      )}
    </Button>
  );
};

export default memo(ButtonLoader);
