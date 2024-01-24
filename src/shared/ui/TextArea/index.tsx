import { FormHelperText, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface ITextareaProps {
  name: string;
  placeholder?: string;
  label?: string;
  rules?: Omit<
    RegisterOptions,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  minRows?: number;
}

const BasicTextArea = (props: ITextareaProps) => {
  const { name, rules, placeholder, minRows = 4 } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box
      sx={{
        "& .textarea": {
          width: "100%",
          resize: "none",
          borderRadius: 1,
          padding: 1,
          borderColor: "rgba(0, 0, 0, 0.12)",
          borderWidth: 2,
          fontFamily: "'Plus Jakarta Sans',sans-serif",
        },
      }}
    >
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field }) => {
          return (
            <Box>
              <TextareaAutosize
                {...field}
                placeholder={placeholder}
                minRows={minRows}
                className="textarea"
              />
            </Box>
          );
        }}
      />
      {errors?.[name]?.message ? (
        <FormHelperText error>
          {errors?.[name]?.message as string}
        </FormHelperText>
      ) : null}
    </Box>
  );
};

export default BasicTextArea;
