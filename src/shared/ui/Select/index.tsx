import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { DynamicObject } from "shared/helpers/hooks/useFetchQuery";

export interface ISelectProps<T> {
  label: string;
  options: T[];
  onChangeCB?: (value: number | string) => void;
  clearable?: boolean;
  disabled?: boolean;
  getValue?: (val: T) => string;
  getLabel?: (val: T) => string;
  valueProp?: keyof T;
  labelProp?: keyof T;
  onFormatValue?: (value: string) => unknown;
  size?: "small" | "medium";
  name: string;
  rules?: Omit<
    RegisterOptions,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  defaultValue?: number | string;
  isOptionDisabled?: (opt: T) => boolean;
  hasDisabledOption?: boolean;
}

const BasicSelect = <T extends DynamicObject>({
  label,
  options,
  name,
  disabled,
  labelProp = "name",
  valueProp = "id",
  getValue,
  getLabel,
  clearable = false,
  onChangeCB,
  onFormatValue,
  size = "medium",
  rules,
  defaultValue,
  isOptionDisabled,
  hasDisabledOption = false,
}: ISelectProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleChange = (
    e: SelectChangeEvent<string>,
    onChange: (...event: any[]) => void
  ) => {
    const value = e.target.value;
    if (onFormatValue) {
      const result = onFormatValue(value);
      onChange(result);
    } else {
      onChange(value);
    }
    onChangeCB?.(value);
  };

  const handleReset = (onChange: (...event: any[]) => void, value: any) => {
    onChange("");
    onChangeCB?.(value);
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <FormControl fullWidth variant="filled">
              <InputLabel>{label}</InputLabel>
              <Select
                error={!!errors?.[name]?.message}
                endAdornment={
                  field?.value && clearable ? (
                    <Box sx={{ cursor: "pointer" }} mr={3} mt={0.5}>
                      <DeleteIcon
                        height={20}
                        onClick={() => handleReset(field.onChange, field.value)}
                      />
                    </Box>
                  ) : null
                }
                size={size}
                {...field}
                value={
                  typeof valueProp === "string"
                    ? (field.value as string)
                    : getValue?.(field.value)
                }
                onChange={(e) => {
                  handleChange(e, field.onChange);
                }}
                label={label}
                disabled={disabled}
              >
                {options?.map((option: T, index: number) => {
                  return (
                    <MenuItem
                      sx={{ fontSize: 14 }}
                      key={index}
                      disabled={
                        hasDisabledOption ? isOptionDisabled?.(option) : false
                      }
                      value={
                        typeof valueProp === "string"
                          ? option[valueProp as string]
                          : getValue?.(option)
                      }
                    >
                      {typeof labelProp === "string"
                        ? option[labelProp as string]
                        : getLabel?.(option)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <FormHelperText error sx={{ ml: 2, marginTop: "3px!important" }}>
          {errors?.[name]?.message as string}
        </FormHelperText>
      ) : (
        ""
      )}
    </>
  );
};

export default BasicSelect;
