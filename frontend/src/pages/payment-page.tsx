import { Navbar } from "@/components/navbar";
import { PaymentForm } from "@/components/payment-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { paymentApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SbOB31Wb7ykoxa1bCxFUAwnNDj61yxoldpLkLFRaib3Wyy13KZ0HL9C1pUw6FZZapXM9Cp4EKK8xaudINPMVAZP00AwtmDTna"
);

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const rentalData = location.state?.rentalData;

  const [clientSecret, setClientSecret] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (rentalData) {
      paymentApi
        .createPaymentIntent(rentalData.totalPrice)
        .then((res) => {
          setClientSecret(res.clientSecret);
        })
        .catch((err) => console.error("Error creating payment intent:", err));
    }
  }, [rentalData]);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: isDarkMode ? "night" : "stripe",
      variables: {
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        colorText: isDarkMode ? "#f8fafc" : "#0f172a",
        colorPrimary: isDarkMode ? "#f8fafc" : "#0f172a",
        colorBackground: isDarkMode ? "#020817" : "#ffffff",
        gridRowSpacing: "16px",
      },
      rules: {
        ".Input": {
          borderColor: isDarkMode ? "#1e293b" : "#e2e8f0",
          backgroundColor: isDarkMode ? "#020817" : "#ffffff",
          color: isDarkMode ? "#f8fafc" : "#0f172a",
        },
        ".Label": {
          color: isDarkMode ? "#f8fafc" : "#0f172a",
        },
        ".Tab": {
          backgroundColor: isDarkMode ? "#020817" : "#ffffff",
          borderColor: isDarkMode ? "#1e293b" : "#e2e8f0",
        },
        ".Tab--selected": {
          backgroundColor: isDarkMode ? "#1e293b" : "#f1f5f9",
          borderColor: isDarkMode ? "#334155" : "#cbd5e1",
        },
        ".Tab:hover": {
          backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
        },
      },
    },
  };

  if (!rentalData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto shadow-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-4">
              No reservation data found
            </h2>
            <Button onClick={() => navigate("/cars")}>Go to Cars</Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-300">
      <Navbar />

      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none -z-10" />

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={stripeOptions}
            key={isDarkMode ? "dark" : "light"}
          >
            <PaymentForm rentalData={rentalData} clientSecret={clientSecret} />
          </Elements>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Initializing secure payment...
            </p>
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; 2025 RentCar. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
