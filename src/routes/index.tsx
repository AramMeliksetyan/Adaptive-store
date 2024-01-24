import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { FallbackSpinner } from "shared/components/FallbackSpinner";
import { EMainRoutes, ERoutes } from "./constants";
import { useSelector } from "react-redux";
import { selectAuthenticatedState } from "store/slicers/auth";
import { selectTabsData } from "store/slicers/common";

const DashboardLayout = lazy(() => import("layout/DashboardLayout"));
const AuthLayout = lazy(() => import("layout/AuthLayout"));
const Login = lazy(() => import("pages/Auth/Login"));
const Orders = lazy(() => import("pages/Dashboard/Orders"));
const Products = lazy(() => import("pages/Dashboard/Products"));
const Companies = lazy(() => import("pages/Dashboard/Companies"));
const AddUpdateCompany = lazy(
  () => import("pages/Dashboard/Companies/components/AddUpdateCompany")
);
const AddUpdateProduct = lazy(
  () => import("pages/Dashboard/Products/components/AddUpdateProduct")
);
const AddUpdateVariant = lazy(
  () => import("pages/Dashboard/Products/components/AddUpdateVariant")
);

const CreateRoutes = () => {
  const isAuthorized = useSelector(selectAuthenticatedState);
  const tabData = useSelector(selectTabsData);

  const tabDataArr = () => {
    return tabData?.map((item) => {
      return {
        path: `/${EMainRoutes.DASHBOARD}/${item.url}`,
        element: (
          <Suspense fallback={FallbackSpinner}>
            <Products />
          </Suspense>
        ),
      };
    });
  };

  const router = createBrowserRouter([
    {
      path: `/${EMainRoutes.DASHBOARD}`,
      element: isAuthorized ? (
        <Suspense fallback={FallbackSpinner}>
          <DashboardLayout />
        </Suspense>
      ) : (
        <Navigate to={`/${EMainRoutes.AUTH}/${ERoutes.LOGIN}`} replace />
      ),
      children: [
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.ORDERS}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <Orders />
            </Suspense>
          ),
        },
        ...tabDataArr(),

        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.COMPANIES}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <Companies />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.COMPANIES}/${ERoutes.ADD_COMPANY}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateCompany />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.COMPANIES}/${ERoutes.UPDATE_COMPANY}/:id`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateCompany />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}/${ERoutes.ADD_PRODUCT}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateProduct />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.PRODUCTS}/${ERoutes.UPDATE_PRODUCT}/:id`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateProduct />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.VARIANTS}/${ERoutes.ADD_VARIANT}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateVariant />
            </Suspense>
          ),
        },
        {
          path: `/${EMainRoutes.DASHBOARD}/${ERoutes.VARIANTS}/${ERoutes.UPDATE_VARIANT}/:id`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <AddUpdateVariant />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: `/${EMainRoutes.AUTH}`,
      element: !isAuthorized ? (
        <Suspense fallback={FallbackSpinner}>
          <AuthLayout />
        </Suspense>
      ) : (
        <Navigate to={`/${EMainRoutes.DASHBOARD}`} replace />
      ),
      children: [
        {
          path: `/${EMainRoutes.AUTH}/${ERoutes.LOGIN}`,
          element: (
            <Suspense fallback={FallbackSpinner}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: !isAuthorized ? (
        <Navigate to={`/${EMainRoutes.AUTH}/${ERoutes.LOGIN}`} />
      ) : (
        <Navigate to={`/${EMainRoutes.DASHBOARD}`} />
      ),
    },
  ]);

  return router;
};

export default CreateRoutes;
