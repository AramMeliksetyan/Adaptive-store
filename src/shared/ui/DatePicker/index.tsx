import { SxProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
import { DATE_FORMAT } from "store/config/constants";

export interface IDatePickerProps {
  name: string;
  label: string;
  rules?: { [k: string]: { value: boolean; message: string } };
  sx?: SxProps<any>;
  defaultValue?: Date;
}

const BasicDatePicker = ({
  name,
  label,
  rules,
  sx,
  defaultValue,
}: IDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => (
        <DatePicker label={label} format={DATE_FORMAT} {...field} sx={sx} />
      )}
    />
  );
};

export default BasicDatePicker;
