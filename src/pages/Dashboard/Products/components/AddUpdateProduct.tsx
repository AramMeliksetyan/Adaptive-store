import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EMainRoutes, ERoutes } from "routes/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { requiredRules } from "shared/helpers/validators";
import SharedBreadcrumbs from "shared/ui/Breadcrumbs";
import ButtonLoader from "shared/ui/ButtonLoader";
import BasicSelect from "shared/ui/Select";
import TextInput from "shared/ui/TextInput";
import { ELocalStorage } from "store/config/constants";
import { ERequestStatus } from "store/enums/index.enum";
import { IProduct } from "store/interfaces/product";
import {
  getCategories,
  getCategoriesByTab,
  selectCategories,
} from "store/slicers/common";
import { getCompaniesList, selectCompaniesList } from "store/slicers/company";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "store/slicers/product";

interface IFormValues {
  name: string;
  description: string;
  categoryId: number | "";
  price: number;
  companyId: number | "";
  positionInView: number;
}

const AddUpdateProduct = () => {
  const dispatch = useAsyncDispatch();
  const companiesList = useSelector(selectCompaniesList);
  const categories = useSelector(selectCategories);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const methods = useForm<IFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      companyId: "",
      positionInView: 0,
    },
  });

  const { reset, handleSubmit } = methods;

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: IFormValues) => {
    setButtonLoading(true);
    if (!id) {
      const { meta } = await dispatch(addProduct(data));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        setButtonLoading(false);
        return;
      }
      toast.success("Added Successfully");
    } else {
      const reqData = { ...data, id: Number(id) };
      const { meta } = await dispatch(updateProduct(reqData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        setButtonLoading(false);
        return;
      }
      toast.success("Updated Successfully");
    }
    setButtonLoading(false);
    navigate(`/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}`);
  };

  const init = useCallback(async () => {
    const params = new URLSearchParams({
      tabId: localStorage.getItem(ELocalStorage.tabId) || "",
    }).toString();
    Promise.all([
      dispatch(getCompaniesList()),
      dispatch(getCategoriesByTab(params)),
    ]);
    if (id) {
      const { meta, payload } = await dispatch(getProductById(id));
      const typedPayload = payload as IProduct;
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      reset({
        name: typedPayload?.name,
        description: typedPayload?.description,
        positionInView: typedPayload?.positionInView,
        companyId: typedPayload?.companyId,
        price: typedPayload?.price,
        categoryId: typedPayload?.categoryId,
      });
    }
  }, [reset, id]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <FormProvider {...methods}>
      <Typography variant="h5">
        {id ? "Edit Product" : "Add Product"}
      </Typography>
      <Box sx={{ my: 3 }}>
        <SharedBreadcrumbs />
      </Box>
      <Stack spacing={2}>
        <TextInput label="Name" name="name" rules={requiredRules} />
        <TextInput
          label="Description"
          name="description"
          rules={requiredRules}
        />
        <TextInput
          label="Position"
          name="positionInView"
          type="number"
          rules={{
            ...requiredRules,
            min: {
              value: 1,
              message: "Position must be greater than or equal to 1",
            },
          }}
        />
        <TextInput
          label="Price"
          name="price"
          type="number"
          rules={{
            ...requiredRules,
            min: {
              value: 1,
              message: "Price must be greater than or equal to 1",
            },
          }}
        />
        <BasicSelect
          label={"Company"}
          options={companiesList}
          name={"companyId"}
          clearable
          rules={requiredRules}
        />
        <BasicSelect
          label={"Category"}
          options={categories}
          name={"categoryId"}
          clearable
          rules={requiredRules}
        />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={goBack}>Cancel</Button>
          <ButtonLoader
            isLoading={isButtonLoading}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            <Typography>Submit</Typography>
          </ButtonLoader>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default AddUpdateProduct;
