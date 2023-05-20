import { lazy } from "react";
// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

const PhonePage = Loadable(
  lazy(() => import("views/dashboard-admin/PhonePage"))
);
const EditPhone = Loadable(
  lazy(() => import("views/dashboard-admin/PhonePage/EditPhone"))
);
const AddPhone = Loadable(
  lazy(() => import("views/dashboard-admin/PhonePage/AddPhone"))
);
const AllUsersPage = Loadable(
  lazy(() => import("views/dashboard-admin/AllUserPage"))
);
const Details = Loadable(
  lazy(() => import("views/dashboard-admin/AllUserPage/Details"))
);

const ManageArticles = Loadable(
  lazy(() => import("views/dashboard-admin/ManageArticles"))
);


const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/phone-page",
      element: <PhonePage />,
    },
    {
      path: "/phone-page/edit/:idPhone",
      element: <EditPhone />,
    },
    {
      path: "/phone-page/add",
      element: <AddPhone />,
    },
    {
      path: "/all-users",
      element: <AllUsersPage />,
    },
    {
      path: "/all-users/:_username",
      element: <Details/>,
    },
    {
      path: "/manage-articles",
      element: <ManageArticles />,
    },
   
    
   
  ],
};

export default MainRoutes;
