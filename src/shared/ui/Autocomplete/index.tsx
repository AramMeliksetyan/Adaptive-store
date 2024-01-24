import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FilterOptionsState,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, useCallback } from "react";
import { debounce } from "shared/helpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const select_all = 0;

const selectAllOption = {
  id: select_all,
  name: "Select All",
  value: "Select All",
};

interface IAutocompleteProps<OptionType> {
  optionLabel?: keyof OptionType;
  inputLabel: string;
  async?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium";
  prefix?: string;
  onChangeCB?: (val: OptionType | OptionType[] | null) => void;
  fetchFn?: (search: string) => void;
  options: OptionType[];
  name: string;
  defaultValue: OptionType[] | "";
  multiple?: boolean;
  rules?: any;
  getOptionDisabled?: (option: OptionType) => boolean;
  groupBy?: (option: OptionType) => string;
  hasSelectAllOption?: boolean;
  isEqualByID?: boolean;
  isOptionEqualToValue?: (option: OptionType, value: any) => boolean;
  onFocus?: () => void;
  sx?: any;
}

const BasicAutocomplete = <T extends { [key: string]: string | number }>({
  optionLabel,
  disabled,
  async = false,
  fetchFn,
  loading = false,
  onChangeCB,
  getOptionDisabled,
  inputLabel,
  options,
  size,
  name,
  prefix,
  rules,
  multiple = false,
  defaultValue,
  groupBy = undefined,
  hasSelectAllOption = false,
  isOptionEqualToValue = undefined,
  onFocus = undefined,
  sx,
}: IAutocompleteProps<T>) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const allSelected = options?.length === watch(name)?.length;
  const filter: (options: T[], state: FilterOptionsState<T>) => T[] =
    createFilterOptions();

  const handleSelectAll = (isSelected: boolean) => {
    setValue(name, !isSelected ? options : []);
  };

  const getOptionLabel = (option: T) => {
    return typeof option === "string"
      ? option
      : (option[optionLabel as string] as string) || "";
  };

  const errorInfo = useCallback(() => {
    let errorData = errors as Record<string, any>;
    if (prefix) {
      const nestedName = name.split(".")[1];
      return errorData?.[prefix]?.[nestedName];
    } else {
      return errorData?.[name];
    }
  }, [errors, name, prefix]);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    values: T | T[] | null
  ) => {
    if (multiple) {
      const isSelectAll = (values as T[]).some((i) => i.id === select_all);
      if (isSelectAll) {
        handleSelectAll(allSelected);
      }
    } else {
      setValue(name, values);
      onChangeCB?.(values);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            disabled={disabled}
            size={size}
            sx={sx}
            multiple={multiple}
            onChange={handleChange}
            groupBy={groupBy}
            limitTags={multiple ? 1 : undefined}
            options={options}
            onFocus={onFocus}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return multiple && hasSelectAllOption && filtered.length
                ? [selectAllOption as any, ...filtered]
                : filtered;
            }}
            disableCloseOnSelect={multiple}
            isOptionEqualToValue={(option, value) => {
              return isOptionEqualToValue
                ? isOptionEqualToValue(option, value)
                : JSON.stringify(option) === JSON.stringify(value);
            }}
            {...(async
              ? {
                  onInputChange: debounce((_, value) => fetchFn?.(value)),
                }
              : null)}
            getOptionLabel={getOptionLabel}
            getOptionDisabled={getOptionDisabled}
            loading={true}
            renderOption={(props, option, { selected }) => {
              const selectAllProps =
                option.id === select_all ? { checked: allSelected } : {};
              return (
                <li {...props}>
                  {multiple ? (
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={selected}
                      {...selectAllProps}
                    />
                  ) : null}
                  {getOptionLabel(option)}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={inputLabel}
                error={!!errorInfo?.() && !disabled}
                helperText={
                  !disabled && !!errorInfo()
                    ? errorInfo()?.message?.toString()
                    : null
                }
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};

export default BasicAutocomplete;
