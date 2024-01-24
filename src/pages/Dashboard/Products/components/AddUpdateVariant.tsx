import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EMainRoutes, ERoutes } from "routes/constants";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { requiredRules } from "shared/helpers/validators";
import SharedBreadcrumbs from "shared/ui/Breadcrumbs";
import TextInput from "shared/ui/TextInput";
import { ERequestStatus } from "store/enums/index.enum";
import { IAddVariant, IProduct, IVariant } from "store/interfaces/product";
import {
  addVariant,
  getProductById,
  updateVariant,
} from "store/slicers/product";

interface IFormValues {
  name: string;
  description: string;
  price: number;
  quantity: number;
  mediaPath: string;
  productName: string;
}

const AddUpdateVariant = () => {
  const { state } = useLocation();
  const dispatch = useAsyncDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const imageRef = useRef<HTMLInputElement | null>(null);
  const methods = useForm<IFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      mediaPath: "",
      productName: state.productName,
    },
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
  } = methods;

  const image = watch("mediaPath");

  const goBack = () => {
    navigate(-1);
  };

  const uploadImage = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      if (file) {
        // Read the file as a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          // Set the base64-encoded image data
          setValue("mediaPath", reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      clearErrors(["mediaPath"]);
    }
  };

  const onSubmit = async (data: IFormValues) => {
    const { name, description, price, mediaPath, quantity } = data;
    const reqData: IAddVariant = {
      name,
      description,
      price,
      mediaPath,
      quantity,
      productId: state?.productId,
    };
    if (!id) {
      const { meta } = await dispatch(addVariant(reqData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      toast.success("Added Successfully");
    } else {
      const updateReqData = { ...reqData, id: Number(id) };
      const { meta } = await dispatch(updateVariant(updateReqData));
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      toast.success("Updated Successfully");
    }
    navigate(`/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}`);
  };

  const init = useCallback(async () => {
    if (id) {
      const { meta, payload } = await dispatch(getProductById(state.productId));
      const typedPayload = payload as IProduct;
      const variant: IVariant | undefined = typedPayload?.variants.find(
        (v) => v.id === Number(id)
      );
      if (meta.requestStatus !== ERequestStatus.FULFILLED) {
        return;
      }
      if (variant) {
        reset({
          name: variant?.name,
          description: variant?.description,
          mediaPath: variant?.mediaPath,
          price: variant?.price,
          quantity: variant?.quantity,
        });
      }
    }
  }, [reset, id]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <FormProvider {...methods}>
      <Box>
        <Typography variant="h5">
          {id ? "Edit Variant" : "Add Variant"}
        </Typography>
      </Box>
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
        <TextInput label="Product Name" name="productName" disabled />
        <TextInput
          label="Price"
          name="price"
          type="number"
          rules={requiredRules}
        />
        <TextInput
          label="Quantity"
          name="quantity"
          type="number"
          rules={requiredRules}
        />
        <Box>
          <Button onClick={uploadImage} variant="contained">
            Upload image
          </Button>
          {errors?.mediaPath?.message ? (
            <Box margin="4px 14px">
              <FormHelperText error>
                {errors?.mediaPath?.message}
              </FormHelperText>
            </Box>
          ) : null}
        </Box>
        <Box display="none">
          <input
            {...register("mediaPath", {
              ...requiredRules,
            })}
            type="file"
            hidden
            accept="image/png, image/jpeg"
            ref={imageRef}
            onChange={handleImageChange}
          />
        </Box>
        {image && (
          <Box sx={{ height: "200px" }}>
            <img
              src={image}
              alt="Selected"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button onClick={goBack}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  );
};

export default AddUpdateVariant;
