import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import useFetchQuery from "shared/helpers/hooks/useFetchQuery";
import { ButtonVariantColor } from "shared/ui/DataTable/constants";
import { ICompany } from "store/interfaces/company";
import { getCompanies } from "store/slicers/company";

const Companies = () => {
  const methods = useForm({
    defaultValues: {
      ...defaultFilterValues,
    },
  });
  const { fetchData, data } = useFetchQuery<any>({
    fetchFunction: getCompanies,
  });

  const getActions = (rowData: ICompany) => {
    return [
      {
        label: "View",
        onClick: () => {},
        color: "primary" as ButtonVariantColor,
      },
    ];
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <FormProvider {...methods}></FormProvider>
    </>
  );
};

export default Companies;
