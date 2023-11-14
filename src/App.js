import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./Template/Layout";
import HomePage from "./Page/User/HomePage/HomePage";
import SignInPage from "./Page/Login/SignInPage/SignInPage";
import SignUpPage from "./Page/Login/SignUpPage/SignUpPage";
import PersonalPage from "./Page/User/PersonalPage/PersonalPage";
import SearchCoursePage from "./Page/User/SearchCoursePage/SearchCoursePage";
import ListCourseByCategoriesPage from "./Page/User/ListCourseByCategoriesPage/ListCourseByCategoriesPage";
import AllCoursePage from "./Page/User/AllCoursePage/AllCoursePage";
import NotFoundPage from "./Page/NotFoundPage/NotFoundPage";
import AdminHomePage from "./Page/Admin/AdminHomePage";
import { localServices } from "./Services/localServices";
import CourseDetailPage from "./Page/User/CourseDetailPage/CourseDetailPage";
import AddUser from "./Page/Admin/user/AddUser/AddUser";
import EditUser from "./Page/Admin/user/EditUser/EditUser";

function App() {
  let info = localServices.get();
  let isAdmin;
  if (info !== null && info !== undefined) {
    isAdmin = info.maLoaiNguoiDung === "GV";
  }
  const userRoutes = [
    {
      path: "/",
      element: (
        <Layout>
          {" "}
          <HomePage />
        </Layout>
      ),
    },
    { path: "/signIn", element: <SignInPage /> },
    { path: "/signUp", element: <SignUpPage /> },
    {
      path: "/personal",
      element: (
        <Layout>
          <PersonalPage />
        </Layout>
      ),
    },
    {
      path: "/searchCourse/:tenKhoaHoc",
      element: (
        <Layout>
          <SearchCoursePage />
        </Layout>
      ),
    },
    {
      path: "/listCourseByCategories/:maDanhMuc",
      element: (
        <Layout>
          {" "}
          <ListCourseByCategoriesPage />
        </Layout>
      ),
    },
    {
      path: "/AllCoursePage",
      element: (
        <Layout>
          <AllCoursePage />
        </Layout>
      ),
    },
    {
      path: "/courseDetail/:courseId",
      element: (
        <Layout>
          <CourseDetailPage/>
        </Layout>
      )
    },
    { path: "/*", element: <NotFoundPage /> },
  ];

  const adminRoutes = [
    { path: "/", element: <AdminHomePage /> },
    { path: "/signIn", element: <SignInPage /> },
    { path: "/signUp", element: <SignUpPage /> },
    { path: "/personal", element: <PersonalPage /> },
    { path: "/*", element: <NotFoundPage /> },
    { path: "/admin", element: <AdminHomePage /> },
    { path: "/addUser", element: <AddUser/>},
    { path: `/editUser/:taiKhoan`, element: <EditUser/>}
  ];

  let selectedRoutes = userRoutes;
  if (isAdmin) {
    selectedRoutes = adminRoutes;
  }
  return (
    <div>
      {/* Khi nào mọi người muốn dùng spinner thì mở nó ra nhé  */}
      {/* <Loading /> */}
      <BrowserRouter>
        <Routes>
          {selectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
