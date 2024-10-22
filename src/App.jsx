import { createBrowserRouter, RouterProvider } from "react-router-dom";
import '@mui/material/styles';
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/Root";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage";
import { action as manipulateProductAction } from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import { tokenLoader, checkAuthLoader, logoutUser } from "./util/auth";
import ManagementForm from "./components/ManagementForm";
import ManagementPage, {
  loader as managementsLoader,
} from "./pages/ManagementPage";
import ManagementRootLayout from "./pages/ManagementRootLayout";
import ProductPage, { loader as productsLoader } from "./pages/ProductPage";
import ProductRootLayout from "./pages/ProductRootLayout";
import NewProduct from "./pages/NewProduct";
import Logout from "./pages/Logout";
import BrandRootLayout from "./pages/BrandRootLayout";
import BrandPage, { loader as brandsLoader } from "./pages/BrandPage";
import BrandList, {action as brandAction} from "./components/BrandList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "brand",
        element: <BrandRootLayout />,
        children: [
          {
            index: true,
            element: <BrandPage />,
            loader: brandsLoader,
          },
          {
            path: "list",
            element: <BrandList />,
            action: brandAction
          }
        ],
      },
      {
        path: "product",
        element: <ProductRootLayout />,
        children: [
          {
            index: true,
            element: <ProductPage />,
            loader: productsLoader,
          },
          {
            path: "entry",
            element: <NewProduct />,
            action: manipulateProductAction,
            // loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "category",
        children: [{ path: "entry", element: <CategoryForm /> }],
      },
      {
        path: "management",
        element: <ManagementRootLayout />,
        children: [
          {
            index: true,
            element: <ManagementPage />,
            loader: managementsLoader,
          },
          {
            path: "entry",
            element: <ManagementForm />,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <AuthenticationPage />,
    action: authAction,
    loader: checkAuthLoader,
  },
  {
    path: "logout",
    element: <Logout />,
    action: logoutUser,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
