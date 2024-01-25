import { Box } from "@mui/system";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

const shortcutsItems: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  {
    label: "This Week",
    value: [dayjs().startOf("week"), dayjs().endOf("week")],
  },
  {
    label: "Last Week",
    value: [
      dayjs().subtract(7, "day").startOf("week"),
      dayjs().subtract(7, "day").endOf("week"),
    ],
  },
  {
    label: "Last 7 Days",
    value: [dayjs().subtract(7, "day"), dayjs()],
  },
  {
    label: "Current Month",
    value: [dayjs().startOf("month"), dayjs().endOf("month")],
  },
];
interface IProps {
  name: string;
  onSubmit?: (dates: any) => void;
}

const BasicRangePicker = ({ name, onSubmit }: IProps) => {
  const { control } = useFormContext();

  const onRangeChange = (dates: any, _: string[], field: any) => {
    if (dates) {
      field.onChange([dates[0], dates[1]]);
    } else {
      field.onChange([null, null]);
    }
    onSubmit?.(dates);
  };

  return (
    <Box
      sx={{
        "& .ant-picker": {
          height: "50px",
          width: "100%",
          backgroundColor: "transparent",
          borderRadius: "8px",
          "&.ant-picker-focused": {
            borderWidth: 3,
            borderColor: "primary.main",
            boxShadow: "none",
            "&:hover": {
              borderColor: "primary.main",
            },
          },
          "& input": {
            "::placeholder": {
              color: "#6C737F",
            },
          },
          "&:hover": {
            borderColor: "neutral.200",
          },
        },
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <DatePicker.RangePicker
              {...field}
              presets={shortcutsItems}
              onChange={(dates, datesString) =>
                onRangeChange(dates, datesString, field)
              }
            />
          );
        }}
      />
    </Box>
  );
};

export default BasicRangePicker;
