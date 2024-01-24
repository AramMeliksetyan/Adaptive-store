import { Stack, Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { emailRegex, requiredRules } from "shared/helpers/validators";
import ButtonLoader from "shared/ui/ButtonLoader";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { login } from "store/slicers/auth";

interface IFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const methods = useForm<IFormValues>();
  const dispatch = useAsyncDispatch();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: IFormValues) => {
    setLoading(true);
    const { meta } = await dispatch(login(data));
    if (meta.requestStatus !== ERequestStatus.FULFILLED) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      <Box sx={{ width: 550 }}>
        <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <Typography variant="h5">Sign in</Typography>
            <Stack
              spacing={2}
              sx={{ border: "1px solid rgb(238, 238, 238)", padding: 2 }}
            >
              <TextInput
                label="Email Address"
                name="username"
                type="email"
                rules={{
                  pattern: {
                    value: emailRegex,
                    message: "Please enter a valid email address",
                  },
                  ...requiredRules,
                }}
                variant="standard"
              />
              <TextInput
                label="Password"
                name="password"
                isSecure
                rules={requiredRules}
                variant="standard"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              ></Box>
              <ButtonLoader
                isLoading={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={methods.handleSubmit(onSubmit)}
              >
                <Typography>Continue</Typography>
              </ButtonLoader>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  "& a": {
                    textDecoration: "none",
                    color: "rgb(25, 118, 210)",
                  },
                }}
              >
                <Typography>
                  <Link to="/">Forgot password?</Link>
                </Typography>
                <Typography>
                  <Link to="/">Don't have an account? Sign up</Link>
                </Typography>
              </Box>
            </Stack>
          </FormProvider>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
