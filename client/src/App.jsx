import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Suspense } from "react";
import useScrollToTop from "./hooks/auth/useScrollToTop";

export default function App() {
  useScrollToTop(["/dashboard"]);

  return (
    <>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
