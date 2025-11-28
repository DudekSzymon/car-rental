import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Car, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RentalForm } from "@/components/rental-form";
const carsData = [
  {
    id: 1,
    name: "Toyota Corolla",
    brand: "Toyota",
    year: 2023,
    pricePerDay: 150,
    available: true,
    deposit: 500,
    dailyLimit: 250,
    extraKmFee: 0.5,
  },
  {
    id: 2,
    name: "BMW 3 Series",
    brand: "BMW",
    year: 2024,
    pricePerDay: 350,
    available: true,
    deposit: 1000,
    dailyLimit: 300,
    extraKmFee: 0.75,
  },
  {
    id: 3,
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    pricePerDay: 450,
    available: true,
    deposit: 1500,
    dailyLimit: 300,
    extraKmFee: 1.0,
  },
  {
    id: 4,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    year: 2023,
    pricePerDay: 180,
    available: false,
    deposit: 500,
    dailyLimit: 250,
    extraKmFee: 0.5,
  },
  {
    id: 5,
    name: "Audi Q5",
    brand: "Audi",
    year: 2024,
    pricePerDay: 400,
    available: true,
    deposit: 1200,
    dailyLimit: 300,
    extraKmFee: 0.8,
  },
  {
    id: 6,
    name: "Ford Mustang",
    brand: "Ford",
    year: 2023,
    pricePerDay: 500,
    available: true,
    deposit: 2000,
    dailyLimit: 200,
    extraKmFee: 1.5,
  },
];

export default function RentalPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const car = carsData.find((c) => c.id === Number(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Car not found</h1>
          <Button onClick={() => navigate("/cars")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to list
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <RentalForm car={car} />
      </div>

      <footer className="border-t bg-background mt-16">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              <span className="font-bold">RentCar</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>&copy; 2025 RentCar. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy
              </button>
              <button className="hover:text-foreground transition-colors">
                Terms
              </button>
              <button className="hover:text-foreground transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
