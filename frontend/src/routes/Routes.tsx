import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ProductsPage from "@/pages/ProductsPage";
import ProductPage from "@/pages/ProductPage";
import CheckOutPage from "@/pages/CheckOutPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import UserPage from "@/pages/UserPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/item/:id" element={<ProductPage />} />
        <Route path="checkout" element={<CheckOutPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="users/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;

