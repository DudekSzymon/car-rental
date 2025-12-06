import { Button } from "@/components/ui/button";
import {
  Car,
  Clock,
  Shield,
  CreditCard,
  MapPin,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/context/AuthContext";

import landingHero from "@/assets/images/landing-hero.jpg";
import landing1 from "@/assets/images/landing-1.jpg";
import landing2 from "@/assets/images/landing-2.jpg";
import landing3 from "@/assets/images/landing-3.jpg";
import landing4 from "@/assets/images/landing-4.jpg";

export default function LandingPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="flex flex-col gap-8 items-start justify-center order-2 lg:order-1">
              <div className="flex gap-6 flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                  <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
                  <span className="text-xs font-medium text-primary">
                    Available 24/7
                  </span>
                </div>

                <h1 className="tracking-tight text-5xl md:text-6xl lg:text-7xl font-bold text-balance leading-[1.1]">
                  Rent a car{" "}
                  <span className="relative inline-block">
                    <span className="absolute -z-10 -inset-x-3 bottom-3 h-4 bg-primary/30 rotate-1d rounded-lg blur-sm" />
                    <span className="relative bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      in seconds
                    </span>
                  </span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Wide selection of vehicles, transparent pricing, and instant
                  booking. Your adventure starts here.
                </p>
              </div>

              <ul className="grid gap-4 w-full max-w-md">
                {[
                  { icon: Clock, text: "Lightning-fast booking" },
                  { icon: Car, text: "Wide selection of vehicles" },
                  { icon: Shield, text: "Secure and transparent payments" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 group">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-base font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  size="lg"
                  onClick={() =>
                    navigate(isAuthenticated ? "/cars" : "/register")
                  }
                  className="px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  {isAuthenticated ? "Rent now" : "Get started"}
                </Button>

                {!isAuthenticated && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="px-8 h-12 text-base font-semibold"
                  >
                    I already have an account
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-2xl">
                <div className="absolute -inset-4 bg-linear-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative aspect-4/3 bg-muted rounded-2xl overflow-hidden shadow-2xl border">
                  <img
                    src={landingHero}
                    alt="Car rental hero"
                    onLoad={() => setHeroLoaded(true)}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out",
                      heroLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-linear-to-b from-muted/20 to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
              <p className="text-sm font-normal text-muted-foreground">
                Features
              </p>
              <h2 className="tracking-tight text-4xl md:text-5xl font-bold">
                Everything you need to rent your{" "}
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  perfect car
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Experience seamless car rental with features designed for your
                convenience
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              <div className="bg-card text-card-foreground flex flex-col justify-between border shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden lg:row-span-2 h-full group pt-8">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="px-6 flex flex-col gap-2 relative z-10 shrink-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Instant booking</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Book your car in seconds with our streamlined process. No
                    paperwork, no hassle.
                  </p>
                </div>
                <div className="mt-6 w-full flex-1 relative overflow-hidden min-h-[250px]">
                  <div className="absolute inset-0 w-full h-full px-6 pb-6 flex flex-col justify-end items-center">
                    <img
                      src={landing1}
                      alt="Instant booking"
                      className="w-full h-full object-cover shadow-2xl border rounded-lg rotate-2 scale-95 hover:scale-100 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full h-1/2 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none" />
                </div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-6 border py-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Multiple locations</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pick up and drop off at any of our convenient locations
                    across the city.
                  </p>
                </div>
                <div className="px-6 flex h-full flex-col z-10 items-center justify-center">
                  <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-xl">
                    <img
                      src={landing2}
                      alt="Multiple locations"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-1/3 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none" />
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-6 border py-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden lg:col-start-2 lg:row-2 md:col-1 md:row-3 group">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="flex flex-col gap-2 px-6 relative z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Flexible payments</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pay with credit card, debit card, or digital wallets. We
                    accept all major payment methods.
                  </p>
                </div>
                <div className="px-6 flex h-full flex-col z-10 items-center justify-center mt-2">
                  <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-xl">
                    <img
                      src={landing3}
                      alt="Flexible payments"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-1/3 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none" />
              </div>

              <div className="bg-card text-card-foreground flex flex-col justify-between border shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 md:col-2 md:row-span-2 md:row-start-2 group pt-8">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="px-6 flex flex-col gap-2 relative z-10 shrink-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Mobile app access</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Manage your bookings, unlock your car, and get support
                    directly from your phone.
                  </p>
                </div>
                <div className="mt-6 w-full flex-1 relative overflow-hidden min-h-[250px]">
                  <div className="absolute inset-0 w-full h-full px-6 pb-6 flex flex-col justify-end items-center">
                    <img
                      src={landing4}
                      alt="Mobile app access"
                      className="w-full h-full object-cover shadow-2xl border rounded-lg -rotate-2 scale-95 hover:scale-100 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 w-full h-1/2 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-linear-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 mask-image:radial-gradient(white,transparent_85%)" />
            <div className="relative z-10 flex flex-col gap-6 items-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Ready to hit the road?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl">
                Join thousands of satisfied customers who trust RentCar for
                their travel needs
              </p>
              <Button
                size="lg"
                onClick={() =>
                  navigate(isAuthenticated ? "/cars" : "/register")
                }
                className="bg-background text-foreground hover:bg-background/90 px-8 h-12 text-base font-semibold shadow-xl mt-4"
              >
                {isAuthenticated ? "Rent now" : "Get started now"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/30">
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
