import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";

const BasicCheck = ({ name, label }: { name: string; label: string }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={false}
      render={({ field: { value, ...field } }) => (
        <FormControlLabel
          control={<Checkbox {...field} checked={!!value} />}
          label={label}
        />
      )}
    />
  );
};

export default BasicCheck;
