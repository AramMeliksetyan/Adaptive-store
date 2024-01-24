import { FormControlLabel, Switch } from "@mui/material";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface ISwitchProps {
  name: string;
  label: string;
  rules?: Omit<
    RegisterOptions,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const SharedSwitch = (props: ISwitchProps) => {
  const { name, rules, label } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        return (
          <FormControlLabel
            checked={field.value}
            onChange={field.onChange}
            control={<Switch />}
            label={label}
          />
        );
      }}
    />
  );
};

export default SharedSwitch;
