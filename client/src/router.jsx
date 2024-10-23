import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { postByIdLoader, postBySlugLoader } from "./loaders/posts.loader";
import App from "./App";
import PrivateRoute from "./components/US/PrivateRoute";
import AdminRoute from "./components/US/AdminRoute";
import Loading from "./components/UI/Loaders/Loading";
import SearchPage from "./pages/search/SearchPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SigninPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/RegisterPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const AdminPostPage = lazy(() => import("./pages/admin/AdminPostPage"));
const PostPage = lazy(() => import("./pages/posts/PostPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "sign-in", element: <SigninPage /> },
      { path: "sign-up", element: <SignupPage /> },
      {
        path: "posts/:postSlug",
        element: <PostPage />,
        loader: postBySlugLoader,
      },
      { path: "projects", element: <ProjectsPage /> },

      // User is logged in
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },

      // User is admin
      {
        path: "create-post",
        element: (
          <AdminRoute>
            <AdminPostPage />
          </AdminRoute>
        ),
      },
      {
        path: "update-post/:postId",
        element: (
          <AdminRoute>
            <AdminPostPage />
          </AdminRoute>
        ),
        loader: postByIdLoader,
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
