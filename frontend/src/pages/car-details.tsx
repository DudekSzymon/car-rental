import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Fuel,
  Users,
  Gauge,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Shield,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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
    description: "Economical and reliable sedan perfect for long trips.",
    features: [
      "Air Conditioning",
      "Bluetooth",
      "Backup Camera",
      "GPS Navigation",
      "Cruise Control",
      "USB Port",
    ],
    enginePower: "140 HP",
    fuelConsumption: "5.5 L/100km",
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
    description: "Sporty sedan with dynamic handling and luxurious interior.",
    features: [
      "Leather Seats",
      "Heated Seats",
      "Head-up Display",
      "GPS Navigation",
      "Apple CarPlay",
      "Parking Assistant",
    ],
    enginePower: "258 HP",
    fuelConsumption: "7.2 L/100km",
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
    description: "Luxury sedan with cutting-edge technology and comfort.",
    features: [
      "Massage Seats",
      "Panoramic Roof",
      "Ambient Lighting",
      "Burmester Audio",
      "Drive Assist",
      "Ventilated Seats",
    ],
    enginePower: "220 HP",
    fuelConsumption: "5.8 L/100km",
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
    description: "Compact hatchback perfect for city driving and short trips.",
    features: [
      "Air Conditioning",
      "Bluetooth",
      "Parking Sensors",
      "LED Lights",
      "Cruise Control",
      "Start-Stop",
    ],
    enginePower: "150 HP",
    fuelConsumption: "6.0 L/100km",
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
    description: "Spacious SUV with quattro all-wheel drive for any weather.",
    features: [
      "Quattro AWD",
      "Virtual Cockpit",
      "Matrix LED",
      "3D Navigation",
      "Bang & Olufsen",
      "Adaptive Suspension",
    ],
    enginePower: "204 HP",
    fuelConsumption: "6.5 L/100km",
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
    description: "Iconic muscle car with a powerful V8 engine.",
    features: [
      "V8 Engine",
      "Drive Modes",
      "Launch Control",
      "MagneRide",
      "B&O Premium Audio",
      "Track Apps",
    ],
    enginePower: "450 HP",
    fuelConsumption: "12.5 L/100km",
  },
];

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/cars")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to car list
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="relative aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-muted">
            <img
              src={car.image}
              alt={car.name}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            {!car.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-2xl bg-destructive px-6 py-3 rounded-full">
                  Unavailable
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {car.year} • {car.brand}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {car.name}
              </h1>
              <p className="text-lg text-muted-foreground">{car.description}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                ${car.pricePerDay}
              </span>
              <span className="text-muted-foreground">/ day</span>
            </div>

            <Separator />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Fuel className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Fuel</p>
                <p className="font-semibold">{car.fuelType}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Seats</p>
                <p className="font-semibold">{car.seats}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Gauge className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <Sparkles className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Power</p>
                <p className="font-semibold">{car.enginePower}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                Fuel Consumption:{" "}
                <span className="font-semibold text-foreground">
                  {car.fuelConsumption}
                </span>
              </p>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold"
              disabled={!car.available}
              onClick={() => navigate(`/rental/${car.id}`)}
            >
              <Car className="h-5 w-5 mr-2" />
              {car.available ? "Rent now" : "Car unavailable"}
            </Button>
          </div>
        </div>
      </div>

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
