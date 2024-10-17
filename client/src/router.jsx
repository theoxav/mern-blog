import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/US/PrivateRoute";
import AdminRoute from "./components/US/AdminRoute";
import Loading from "./components/UI/Loaders/Loading";
import { postByIdLoader } from "./loaders/posts.loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SigninPage = lazy(() => import("./pages/auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/auth/RegisterPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DashboardPage = lazy(() => import("./pages/profile/DashboardPage"));
const PostPage = lazy(() => import("./pages/admin/PostPage"));
const NotFoundPage = lazy(() => import("./pages/not-found/NotFoundPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "/sign-in",
        element: (
          <Suspense fallback={<Loading />}>
            <SigninPage />
          </Suspense>
        ),
      },
      {
        path: "/sign-up",
        element: (
          <Suspense fallback={<Loading />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "/projects",
        element: (
          <Suspense fallback={<Loading />}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "/create-post",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminRoute>
              <PostPage />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "/update-post/:postId",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminRoute>
              <PostPage />
            </AdminRoute>
          </Suspense>
        ),
        loader: postByIdLoader,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
