import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Fuel, Users, Gauge, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

import car1Image from "@/assets/images/car-1.jpg";
import car2Image from "@/assets/images/car-2.jpg";
import car3Image from "@/assets/images/car-3.jpg";
import car4Image from "@/assets/images/car-4.jpg";
import car5Image from "@/assets/images/car-5.jpg";
import car6Image from "@/assets/images/car-6.jpg";

const carsData = [
  {
    id: 1,
    name: "Toyota Corolla",
    brand: "Toyota",
    year: 2023,
    pricePerDay: 150,
    fuelType: "Petrol",
    seats: 5,
    transmission: "Automatic",
    image: car1Image,
    available: true,
  },
  {
    id: 2,
    name: "BMW 3 Series",
    brand: "BMW",
    year: 2024,
    pricePerDay: 350,
    fuelType: "Petrol",
    seats: 5,
    transmission: "Automatic",
    image: car2Image,
    available: true,
  },
  {
    id: 3,
    name: "Mercedes-Benz E-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    pricePerDay: 450,
    fuelType: "Diesel",
    seats: 5,
    transmission: "Automatic",
    image: car3Image,
    available: true,
  },
  {
    id: 4,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    year: 2023,
    pricePerDay: 180,
    fuelType: "Petrol",
    seats: 5,
    transmission: "Manual",
    image: car4Image,
    available: true,
  },
  {
    id: 5,
    name: "Audi Q5",
    brand: "Audi",
    year: 2024,
    pricePerDay: 400,
    fuelType: "Diesel",
    seats: 5,
    transmission: "Automatic",
    image: car5Image,
    available: true,
  },
  {
    id: 6,
    name: "Ford Mustang",
    brand: "Ford",
    year: 2023,
    pricePerDay: 500,
    fuelType: "Petrol",
    seats: 4,
    transmission: "Automatic",
    image: car6Image,
    available: true,
  },
];

export default function CarsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isFiltering, setIsFiltering] = useState(false);

  const handleImageLoad = (carId: number) => {
    setLoadedImages((prev) => ({ ...prev, [carId]: true }));
  };

  const handleCategoryChange = (brand: string) => {
    setIsFiltering(true);
    setTimeout(() => {
      setSelectedCategory(brand);
      setIsFiltering(false);
    }, 200);
  };

  const filteredCars = useMemo(() => {
    return selectedCategory === "all"
      ? carsData
      : carsData.filter(
          (car) => car.brand.toLowerCase() === selectedCategory.toLowerCase()
        );
  }, [selectedCategory]);

  const brands = ["all", ...new Set(carsData.map((car) => car.brand))];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Our{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              car fleet
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the perfect sports car for your thrill-seeking side. From
            agile coupes to high-performance supercars — experience pure driving
            adrenaline.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {brands.map((brand) => (
              <Button
                key={brand}
                variant={selectedCategory === brand ? "default" : "outline"}
                onClick={() => handleCategoryChange(brand)}
                className="capitalize"
              >
                {brand === "all" ? "All" : brand}
              </Button>
            ))}
          </div>

          <div
            className={cn(
              "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-opacity duration-300",
              isFiltering ? "opacity-0" : "opacity-100"
            )}
          >
            {filteredCars.map((car) => (
              <Card
                key={car.id}
                className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-xl group",
                  !car.available && "opacity-60"
                )}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    onLoad={() => handleImageLoad(car.id)}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105",
                      loadedImages[car.id]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    )}
                  />
                  {!loadedImages[car.id] && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                  )}
                  {!car.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg bg-destructive px-4 py-2 rounded-full">
                        Unavailable
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      ${car.pricePerDay}/day
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{car.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Fuel className="h-4 w-4" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{car.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Gauge className="h-4 w-4" />
                      <span>
                        {car.transmission === "Automatic" ? "Auto" : "Manual"}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 pt-0">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!car.available}
                    onClick={() => navigate(`/rental/${car.id}`)}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Rent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30 mt-16">
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
