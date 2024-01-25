import { useCallback, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { defaultFilterValues } from "resources/constants";
import { EMainRoutes, ERoutes } from "routes/constants";
import useFetchQuery from "shared/helpers/hooks/useFetchQuery";
import BasicTable from "shared/ui/DataTable";
import {
  ButtonVariantColor,
  IColumn,
  IPaginated,
} from "shared/ui/DataTable/constants";
import { useNavigate } from "react-router-dom";
import useQueryParams from "shared/helpers/hooks/useQueryParams";
import { getProducts } from "store/slicers/product";
import { IProduct, IVariant } from "store/interfaces/product";
import { ELocalStorage } from "store/config/constants";
import { createDynamicColumnFields } from "shared/helpers";

const Products = () => {
  const [get] = useQueryParams();
  const methods = useForm({
    defaultValues: {
      ...defaultFilterValues,
    },
  });
  const { reset } = methods;
  const { fetchData, data } = useFetchQuery<IPaginated<IProduct>>({
    fetchFunction: getProducts,
  });

  const tabId = localStorage.getItem(ELocalStorage.tabId);

  const navigate = useNavigate();

  const addCompany = () => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}/${ERoutes.ADD_PRODUCT}`
    );
  };

  const updateCompany = async (rowData: IProduct) => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}/${ERoutes.UPDATE_PRODUCT}/${rowData.id}`
    );
  };

  const addVariant = (rowData: IProduct) => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.VARIANTS}/${ERoutes.ADD_VARIANT}`,
      { state: { productId: rowData.id, productName: rowData.name } }
    );
  };

  const updateVariant = async (variant: IVariant, rowData: IProduct) => {
    navigate(
      `/${EMainRoutes.DASHBOARD}/${ERoutes.VARIANTS}/${ERoutes.UPDATE_VARIANT}/${variant.id}`,
      { state: { productId: rowData.id, productName: rowData.name } }
    );
  };

  const getActions = (rowData: IProduct) => {
    return [
      {
        label: "edit",
        onClick: () => updateCompany(rowData),
        color: "success" as ButtonVariantColor,
      },
      {
        label: "add variant",
        onClick: () => addVariant(rowData),
        color: "primary" as ButtonVariantColor,
      },
    ];
  };

  const getExpandableActions = (variant: IVariant, row: IProduct) => {
    return [
      {
        label: "edit",
        onClick: () => updateVariant(variant, row),
        color: "success" as ButtonVariantColor,
      },
    ];
  };

  const columns: IColumn[] = useMemo(() => {
    if (data) {
      const columnsArray = createDynamicColumnFields(data?.data?.[0]);
      return columnsArray;
    }
    return [];
  }, [data]);

  const expandableColumns: IColumn[] = useMemo(() => {
    if (data) {
      const columnsArray = createDynamicColumnFields(
        data?.data?.[0]?.variants?.[0]
      );
      return columnsArray;
    }
    return [];
  }, [data]);

  const init = useCallback(() => {
    if (Object.keys(get)?.length > 0) {
      reset({ ...get });
    }
    fetchData({ tabId: tabId });
  }, [fetchData, get, tabId]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <FormProvider {...methods}>
        <BasicTable<IProduct, IVariant>
          tableTitle={"Products"}
          selectable
          expandable
          getExpandableActions={getExpandableActions}
          filterOptions={{ watch: methods.watch, reset: methods.reset }}
          columns={columns}
          expandableColumns={expandableColumns}
          getActions={getActions}
          paginatedData={data}
          addButtonOnClick={addCompany}
          onChange={fetchData}
        />
      </FormProvider>
    </>
  );
};

export default Products;
