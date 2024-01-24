import { InputAdornment, TextField, TextFieldVariants } from "@mui/material";
import { Fragment, useCallback, Ref, useState } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import CrossIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface IInputProps {
  size?: "small" | "medium";
  name: string;
  multiline?: boolean;
  label: string;
  placeholder?: string;
  isSecure?: boolean;
  type?: string;
  clearable?: boolean;
  onBlur?: () => void;
  rules?: Omit<
    RegisterOptions,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  onClear?: () => void;
  disabled?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  variant?: TextFieldVariants;
}

const formatNameWithIndex = (str: string) => {
  let string = str.replace(/[\W_]/g, " ");
  let [prefix, index] = string.split(" ");
  return {
    prefix,
    index,
  };
};

const InputField = ({
  size,
  name,
  label,
  placeholder = "",
  type,
  multiline = false,
  clearable = false,
  rules,
  isSecure = false,
  onClear,
  onBlur,
  inputRef,
  disabled,
  variant = "filled",
}: IInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [invisible, setVisible] = useState(true);
  // const [hasValue, setHasValue] = useState(false);

  const handleClearInput = (field: any) => {
    field.onChange((_: any) => (field.value = ""));
    onClear?.();
  };

  const toggleVisible = () => {
    setVisible(!invisible);
  };

  const getEndAdornment = (field: any) => {
    if (clearable) {
      return (
        <InputAdornment
          position={"end"}
          onClick={() => handleClearInput(field)}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <CrossIcon />
        </InputAdornment>
      );
    } else if (isSecure) {
      return (
        <InputAdornment
          position={"end"}
          onClick={toggleVisible}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          {invisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </InputAdornment>
      );
    }
  };

  const errorInfo = useCallback(() => {
    if (name.includes(".")) {
      const [start, end] = name.split(".");
      if (start.includes("[")) {
        const { prefix, index } = formatNameWithIndex(start);
        return (errors as Record<string, any>)?.[prefix]?.[index]?.[
          end
        ] as string;
      }
      return (errors as Record<string, any>)?.[start]?.[end];
    } else {
      return errors?.[name];
    }
  }, [errors, name]);

  // const makeAnimationStartHandler = (stateSetter: any) => (e: any) => {
  //   const autofilled = !!e.target?.matches("*:-webkit-autofill");
  //   if (e.animationName === "mui-auto-fill") {
  //     stateSetter(autofilled);
  //   }

  //   if (e.animationName === "mui-auto-fill-cancel") {
  //     stateSetter(autofilled);
  //   }
  // };

  return (
    <Fragment>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            id={name}
            // inputProps={{
            //   onAnimationStart: makeAnimationStartHandler(setHasValue),
            // }}
            // InputLabelProps={{
            //   shrink: hasValue,
            // }}
            size={size}
            inputRef={inputRef}
            value={field.value ?? ""}
            placeholder={placeholder}
            error={!!errorInfo?.() && !disabled}
            helperText={
              !disabled && !!errorInfo()
                ? errorInfo()?.message?.toString()
                : null
            }
            fullWidth
            type={invisible && isSecure ? "password" : type || "text"}
            label={label}
            multiline={multiline}
            variant={variant}
            disabled={disabled}
            onBlur={onBlur}
            InputProps={{
              endAdornment: getEndAdornment(field),
            }}
          />
        )}
      />
    </Fragment>
  );
};

export default InputField;
