import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { rentalsApi } from "@/lib/api";

interface PaymentFormProps {
  rentalData: any;
  clientSecret: string;
}

export function PaymentForm({ rentalData }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await rentalsApi.create(rentalData);
        toast.success("Payment successful! Car rented.");
        navigate("/");
      } catch (backendError: any) {
        console.error(backendError);
        toast.error(
          "Payment succeeded but reservation failed. Contact support."
        );
      }
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Secure Payment</CardTitle>
        <CardDescription>
          Total amount:{" "}
          <span className="font-bold text-primary">
            ${rentalData.totalPrice}
          </span>
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <PaymentElement />
          </div>

          {errorMessage && (
            <div className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md border border-destructive/20">
              {errorMessage}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 mt-4">
          <Button
            className="w-full h-11 text-md font-semibold"
            type="submit"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay $${rentalData.totalPrice}`
            )}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
