import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ModeToggle } from "@/components/mode-toggle";
import { Car, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function LandingPage() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const carImages = [
    {
      url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1600&q=80",
      title: "Luxury Sports Cars",
      description: "Experience premium performance",
    },

    {
      url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=80",
      title: "Modern SUVs",
      description: "Perfect for family adventures",
    },

    {
      url: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600&q=80",
      title: "Electric Vehicles",
      description: "Drive the future today",
    },

    {
      url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80",
      title: "Convertibles",
      description: "Feel the freedom",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted">
      {/* Header */}

      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />

            <span className="text-xl font-bold">RentCar</span>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}

      <section className="container px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              Your Perfect Car,{" "}
              <span className="text-primary">Just a Click Away</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover premium vehicles for every journey. Fast, reliable, and
              affordable car rental at your fingertips.
            </p>
          </div>

          {/* Carousel */}

          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-5xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {carImages.map((car, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    <img
                      src={car.url}
                      alt={car.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex items-end">
                      <div className="p-8 text-white">
                        <h3 className="text-3xl font-bold mb-2">{car.title}</h3>

                        <p className="text-lg text-gray-200">
                          {car.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4" />

            <CarouselNext className="right-4" />
          </Carousel>

          <div className="flex justify-center gap-4 mt-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/register">Book Now</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="container px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>

                <p className="text-sm text-muted-foreground">
                  Choose from hundreds of vehicles to match your style and needs
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>

                <p className="text-sm text-muted-foreground">
                  Round-the-clock customer service whenever you need assistance
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2">Fully Insured</h3>

                <p className="text-sm text-muted-foreground">
                  All vehicles come with comprehensive insurance coverage
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold text-lg mb-2">Best Prices</h3>

                <p className="text-sm text-muted-foreground">
                  Competitive rates with no hidden fees or surprises
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="container px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Hit the Road?
              </h2>

              <p className="text-lg mb-6 opacity-90">
                Join thousands of satisfied customers and book your perfect car
                today
              </p>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                <Link to="/register">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}

      <footer className="border-t bg-background">
        <div className="container px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 RentCar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
