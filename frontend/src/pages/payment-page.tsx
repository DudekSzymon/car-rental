import { Navbar } from "@/components/navbar";
import { PaymentForm } from "@/components/payment-form";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none -z-10" />

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <PaymentForm />
      </main>

      <footer className="border-t bg-muted/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; 2025 RentCar. Secure Payment.
        </div>
      </footer>
    </div>
  );
}
