import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import LandingPage from "./pages/landing-page";
import AboutPage from "./pages/about";
import CarsPage from "./pages/cars";
import CarDetailsPage from "./pages/car-details";
import RentalFormPage from "./pages/rental";
import PaymentPage from "./pages/payment-page";
import { Toaster } from "@/components/ui/sonner";
import AdminLayout from "@/layouts/AdminLayout";
import CarsManager from "@/pages/admin/CarsManager";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/rental/:id" element={<RentalFormPage />} />
            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                element={
                  <div className="p-6">
                    <h1 className="text-3xl font-bold mb-4">
                      Welcome back, Admin!
                    </h1>
                    <p className="text-muted-foreground">
                      Select an option from the sidebar to manage your car
                      rental business.
                    </p>
                  </div>
                }
              />
              <Route path="cars" element={<CarsManager />} />
              <Route
                path="rentals"
                element={
                  <div className="p-6 text-xl">
                    Rentals Management (Coming Soon)
                  </div>
                }
              />
              <Route
                path="users"
                element={
                  <div className="p-6 text-xl">
                    Users Management (Coming Soon)
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
