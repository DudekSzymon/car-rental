import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";
import { PaymentForm } from "@/components/payment-form";

export default function PaymentPage() {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              RentCar
            </span>
          </Link>

          <NavigationMenu
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            viewport={false}
          >
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/cars" className={navigationMenuTriggerStyle()}>
                    Cars
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 sm:gap-4">
            <ModeToggle />
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex"
            >
              Log in
            </Button>
            <Button onClick={() => navigate("/register")} size="default">
              Sign up
            </Button>
          </div>
        </div>
      </header>

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
