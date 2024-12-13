import { Home } from "lucide-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import AdminLayout from "./layouts/AdminLayout";
import { ProductProvider } from "./contexts/ProductContext";
import RootLayout from "./layouts/RootLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AuthProvider>
                  <RootLayout />
                </AuthProvider>
              }
            >
              <Route path="/" element={<Home />} />
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} index />
                <Route
                  path="products"
                  element={
                    <ProductProvider>
                      <Products />
                    </ProductProvider>
                  }
                />
                <Route path="users" element={<Users />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
