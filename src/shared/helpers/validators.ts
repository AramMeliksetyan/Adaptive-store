export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

export const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

export const requiredRules = {
  required: {
    value: true,
    message: "required",
  },
};
export const phoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
export const onlyPositiveNumbers = /^[1-9]\d*$/;
export const onlyPositiveNumbersWithDot = /^(?!0\d*$)\d+(?:\.\d{1,2})?$/;

export const emailRule = {
  pattern: {
    value: emailRegex,
    message: "Invalid Email",
  },
};

export const passwordRules = {
  pattern: {
    value: passwordRegex,
    message:
      "Password Should contain minimum of one Uppercase, one Lowercase and one Number",
  },
  minLength: {
    value: 8,
    message: "Minimum length is 8 symbols",
  },
};

export const phoneNumberRules = {
  minLength: {
    value: 9,
    message: "Enter only + or numbers, minimum 9 symbols",
  },
  pattern: {
    value: phoneNumberRegex,
    message: "Enter only + or numbers, minimum 9 symbols",
  },
};
