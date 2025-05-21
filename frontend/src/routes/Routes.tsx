import CheckOutPage from "@/pages/CheckOutPage";
import HomePage from "@/pages/HomePage";
import ProductPage from "@/pages/ProductPage";
import ProductsPage from "@/pages/ProductsPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import UserPage from "@/pages/UserPage";
import { Layout } from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
