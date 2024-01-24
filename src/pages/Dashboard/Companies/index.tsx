import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import { EMainRoutes, ERoutes } from "routes/constants";
import useFetchQuery from "shared/helpers/hooks/useFetchQuery";
import BasicTable from "shared/ui/DataTable";
import { ButtonVariantColor, IPaginated } from "shared/ui/DataTable/constants";
import { ICompany } from "store/interfaces/company";
import { getCompanies } from "store/slicers/company";
import { columns } from "./constants/column";
import { useNavigate } from "react-router-dom";
import useQueryParams from "shared/helpers/hooks/useQueryParams";

const Companies = () => {
  const [get] = useQueryParams();
  const methods = useForm({
    defaultValues: {
      ...defaultFilterValues,
    },
  });
  const { reset } = methods;
  const { fetchData, data } = useFetchQuery<IPaginated<ICompany>>({
    fetchFunction: getCompanies,
  });

  const navigate = useNavigate();

  const addCompany = () => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.COMPANIES}/${ERoutes.ADD_COMPANY}`
    );
  };

  const updateCompany = async (rowData: ICompany) => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.COMPANIES}/${ERoutes.UPDATE_COMPANY}/${rowData.id}`
    );
  };

  const getActions = (rowData: ICompany) => {
    return [
      {
        label: "edit",
        onClick: () => updateCompany(rowData),
        color: "success" as ButtonVariantColor,
      },
    ];
  };

  const init = useCallback(() => {
    if (Object.keys(get)?.length > 0) {
      reset({ ...get });
    }
    fetchData();
  }, [fetchData, get]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <FormProvider {...methods}>
        <BasicTable<ICompany>
          tableTitle={"Companies"}
          selectable
          filterOptions={{ watch: methods.watch, reset: methods.reset }}
          columns={columns}
          getActions={getActions}
          paginatedData={data}
          addButtonOnClick={addCompany}
          onChange={fetchData}
        />
      </FormProvider>
    </>
  );
};

export default Companies;
