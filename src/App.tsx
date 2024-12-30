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
import Home from "./pages/home/Home";
import PageNotFound from "./pages/PageNotFound";
import Store from "./pages/store/Store";
import StoreLayout from "./layouts/StoreLayout";
import Group from "./pages/admin/Group";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Home />} />
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Route>
                {/* Store Routes */}
                <Route element={<StoreLayout />}>
                  <Route path="/store" element={<Store />}>
                    <Route path=":category" element={<Store />} />
                    <Route path=":category/:productId" element={<Store />} />
                  </Route>
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
              {/* Admin Routes */}
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
                <Route path="groups" element={<Group />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
