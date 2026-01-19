import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { ToastProvider } from "./components/ui/toast";
import RouteGuard from "./lib/route-guard";
import OrdersPage from "./pages/orders/orders-page";
const TeamPage = lazy(() => import("./pages/team/team-page"));
const ProductPage = lazy(() => import("./pages/products/products-page"));
const CategoriesPage = lazy(() => import("./pages/categories/categories-page"));
const Signup04 = lazy(() => import("./pages/signup/signup-page"));
const MetersPage = lazy(() => import("./pages/meters/meters-page"));
const CustomerPage = lazy(() => import("./pages/customers/customer-page"));
const CreateWorkspace = lazy(() => import("./pages/create-workspace/create-workspace-page"));
const Workspace = lazy(() => import("./pages/workspace/workspace-page"));
const Login04 = lazy(() => import("./pages/login/login-page"));
const Suspense01 = lazy(() => import("./components/suspense-ui"));
const Home = lazy(() => import("./pages/home/Home"));
const Settings = lazy(() => import("./pages/settings/settings-page"));
const Catalouge = lazy(() => import("./pages/catalogue/catalogue-page"));
const EventPage = lazy(() => import("@/pages/events/events-page"))
const App: React.FC = () => {

  return (
    <>
      <ToastProvider position="bottom-center" timeout={3000} />
      <Suspense fallback={<Suspense01 />}>
        <Routes>
          <Route element={<RouteGuard type="public" />}>
            <Route path="/login" element={<Login04 />} />
            <Route path="/signup" element={<Signup04 />} />
            <Route element={<RouteGuard type="after-login" />}>
              <Route path="/create-organization" element={<CreateWorkspace />} />
            </Route>
          </Route>
          <Route element={<RouteGuard type="private" withLayout={true} />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/teams" element={<TeamPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/plans-settings" element={<Workspace />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/usage-billing/meters" element={<MetersPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/catalogue" element={<Catalouge />} />
            <Route path="/usage-billing/events" element={<EventPage />} />
            <Route path="/customers" element={<CustomerPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
