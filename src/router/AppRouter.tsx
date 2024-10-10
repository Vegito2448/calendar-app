import { CgSpinnerTwo } from "react-icons/cg";
import { RouterProvider } from "react-router-dom";
import { router } from "./mainRouter";

export const AppRouter = () => {


  return <RouterProvider
    router={router}
    fallbackElement={<CgSpinnerTwo size={50} />}
  />;
};