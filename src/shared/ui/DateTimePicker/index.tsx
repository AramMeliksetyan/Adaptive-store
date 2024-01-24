import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";
// import { DATE_FORMAT, HOUR_FORMAT } from "store/config/constants";

export interface IDateTimePickerProps {
  name: string;
  label: string;
  defaultValue: Date;
  minDateTime?: Date;
  sx: any;
  rules?: any;
  disablePast: boolean;
}

const BasicDateTimePicker = ({
  name,
  label,
  defaultValue,
  minDateTime,
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
          <MobileDateTimePicker
            {...field}
            sx={sx}
            label={label}
            minDateTime={minDateTime}
            disablePast={disablePast}
            ampm={false}
          />
        );
      }}
    />
  );
};

export default BasicDateTimePicker;
