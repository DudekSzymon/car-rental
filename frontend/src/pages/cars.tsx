import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Car, Fuel, Users, Gauge, Info, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { carsApi } from "@/lib/api";

import car1Image from "@/assets/images/car-1.jpg";
import car2Image from "@/assets/images/car-2.jpg";
import car3Image from "@/assets/images/car-3.jpg";
import car4Image from "@/assets/images/car-4.jpg";
import car5Image from "@/assets/images/car-5.jpg";
import car6Image from "@/assets/images/car-6.jpg";

const imageMap: Record<string, string> = {
  "car-1.jpg": car1Image,
  "car-2.jpg": car2Image,
  "car-3.jpg": car3Image,
  "car-4.jpg": car4Image,
  "car-5.jpg": car5Image,
  "car-6.jpg": car6Image,
};

interface CarData {
  _id: string;
  name: string;
  brand: string;
  year: number;
  pricePerDay: number;
  fuelType: string;
  seats: number;
  transmission: string;
  image: string;
  available: boolean;
}

export default function CarsPage() {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carsApi.getAll();
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleImageLoad = (carId: string) => {
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
      ? cars
      : cars.filter(
          (car) => car.brand.toLowerCase() === selectedCategory.toLowerCase()
        );
  }, [selectedCategory, cars]);

  const brands = ["all", ...new Set(cars.map((car) => car.brand))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            Choose the perfect sports car for your thrill-seeking side.
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
                key={car._id}
                className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-xl group",
                  !car.available && "opacity-60"
                )}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={imageMap[car.image] || car1Image}
                    alt={car.name}
                    onLoad={() => handleImageLoad(car._id)}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105",
                      loadedImages[car._id]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    )}
                  />
                  {!loadedImages[car._id] && (
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
                    onClick={() => navigate(`/cars/${car._id}`)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!car.available}
                    onClick={() => navigate(`/rental/${car._id}`)}
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
