import { MobileTimePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
// import { DATE_FORMAT, HOUR_FORMAT } from "store/config/constants";

export interface IDateTimePickerProps {
  name: string;
  label: string;
  defaultValue: Date;
  sx: any;
  rules?: any;
  disablePast: boolean;
}

const BasicTimePicker = ({
  name,
  label,
  defaultValue,
  rules,
  sx,
  disablePast = true,
}: IDateTimePickerProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <MobileTimePicker
            {...field}
            sx={sx}
            label={label}
            ampm={false}
            disablePast={disablePast}
            // inputFormat={`${DATE_FORMAT} ${HOUR_FORMAT}`}
          />
        );
      }}
    />
  );
};

export default BasicTimePicker;
