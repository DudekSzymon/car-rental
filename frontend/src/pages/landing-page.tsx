import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import landingHero from "@/assets/images/landing-hero.jpg";
import landing1 from "@/assets/images/landing-1.jpg";
import landing2 from "@/assets/images/landing-2.jpg";
import landing3 from "@/assets/images/landing-3.jpg";
import landing4 from "@/assets/images/landing-4.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">RentCar</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => scrollToSection("home")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("features")}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection("about")}>
              About Us
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/register")}>Sign up</Button>
          </div>
        </div>
      </header>

      <section id="home" className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="flex flex-col gap-6 sm:gap-8 items-start justify-center">
              <div className="flex gap-4 sm:gap-6 flex-col">
                <h1 className="tracking-tight text-5xl md:text-6xl font-semibold text-balance">
                  <span className="pr-2">Rent a car</span>
                  <span className="relative inline-block">
                    <span className="absolute -z-10 -inset-x-2.5 bottom-2 h-3 bg-primary/30 rotate-1 rounded"></span>
                    in seconds
                  </span>
                </h1>
                <p className="text-base font-normal text-muted-foreground">
                  Wide selection of vehicles, transparent pricing, and instant
                  booking. Your adventure starts here.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <Check className="size-5 text-primary" />
                  <span className="text-base font-medium">
                    Lightning-fast booking
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 text-primary" />
                  <span className="text-base font-medium">
                    Wide selection of vehicles
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5 text-primary" />
                  <span className="text-base font-medium">
                    Secure and transparent payments
                  </span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="px-6"
                >
                  Get started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="px-6"
                >
                  I already have an account
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full h-full aspect-4/3 bg-muted rounded-xl overflow-hidden">
                {(() => {
                  const [loaded, setLoaded] = useState(false);
                  return (
                    <img
                      src={landingHero}
                      alt="Car rental hero"
                      onLoad={() => setLoaded(true)}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out dark:brightness-[0.2] dark:grayscale",
                        loaded ? "opacity-100" : "opacity-0"
                      )}
                    />
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container mx-auto max-w-full md:max-w-7xl px-6 py-16 md:py-24">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 md:gap-5">
              <p className="text-sm font-normal text-muted-foreground">
                Features
              </p>
              <h2 className="tracking-tight text-4xl font-semibold md:max-w-xl">
                Everything you need to rent your perfect car
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl relative overflow-hidden md:row-span-2 h-full">
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                  <div className="text-lg font-semibold">Instant booking</div>
                  <div className="text-muted-foreground text-sm">
                    Book your car in seconds with our streamlined process. No
                    paperwork, no hassle.
                  </div>
                </div>
                <div className="px-6 flex h-full flex-col z-1 items-center">
                  <img
                    src={landing1}
                    alt="Instant booking"
                    width="400"
                    height="282"
                    loading="lazy"
                    decoding="async"
                    className="shadow-lg border rotate-2 scale-[0.85]"
                  />
                </div>
                <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(circle_at_-30%_60%,#FFEEB0_0%,#F6FFB3_20%,#CFFFFA_38%,#ADDEFF_57%,#ACE5FF_72%,#B6B6FF_89%,#F9B8FF_100%)]"></div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl h-full relative overflow-hidden">
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
                  <div className="text-lg font-semibold">
                    Multiple locations
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Pick up and drop off at any of our convenient locations
                    across the city.
                  </div>
                </div>
                <div className="px-6 flex h-full flex-col z-10 items-center justify-center">
                  <img
                    src={landing2}
                    alt="Multiple locations"
                    width="400"
                    height="282"
                    loading="lazy"
                    decoding="async"
                    className="scale-[0.85] rounded-xl"
                  />
                </div>
                <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(circle_at_-30%_200%,#FFEEB0_0%,#F6FFB3_20%,#CFFFFA_38%,#ADDEFF_57%,#ACE5FF_72%,#B6B6FF_89%,#F9B8FF_100%)]"></div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-3 border p-6 shadow-sm rounded-xl h-full relative overflow-hidden lg:col-start-2 lg:row-2 md:col-1 md:row-3">
                <div className="flex flex-col gap-1.5">
                  <div className="text-lg font-semibold">Flexible payments</div>
                  <div className="text-muted-foreground text-sm">
                    Pay with credit card, debit card, or digital wallets. We
                    accept all major payment methods.
                  </div>
                </div>
                <div className="flex h-full flex-col z-10 items-center justify-center">
                  <div className="scale-[0.85] rounded-2xl overflow-hidden w-[280px] h-[280px]">
                    <img
                      src={landing3}
                      alt="Flexible payments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(ellipse_100%_200%_at_120%_150%,#FFEEB0_0%,#F6FFB3_20%,#CFFFFA_38%,#ADDEFF_57%,#ACE5FF_72%,#B6B6FF_89%,#F9B8FF_100%)]"></div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl h-full relative overflow-hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 md:col-2 md:row-span-2 md:row-start-2">
                <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                  <div className="text-lg font-semibold">Mobile app access</div>
                  <div className="text-muted-foreground text-sm">
                    Manage your bookings, unlock your car, and get support
                    directly from your phone.
                  </div>
                </div>
                <div className="px-6 flex h-full flex-col z-1 items-center">
                  <img
                    src={landing4}
                    alt="Mobile app access"
                    width="437"
                    height="334"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(ellipse_100%_250%_at_100%_100%,rgb(255,238,176)_0%,rgb(246,255,179)_20%,rgb(207,255,250)_38%,rgb(173,222,255)_57%,rgb(172,229,255)_72%,rgb(182,182,255)_89%,rgb(249,184,255)_100%)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-muted/30">
        <div className="container mx-auto max-w-full md:max-w-7xl px-6 py-16 md:py-24">
          <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 md:gap-5">
              <p className="text-sm font-normal text-muted-foreground">
                About Us
              </p>
              <h2 className="tracking-tight text-4xl font-semibold md:max-w-3xl">
                Your trusted partner in car rental services
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl">
                We've been providing quality car rental services for years, helping thousands of customers find the perfect vehicle for their needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card text-card-foreground flex flex-col gap-4 border p-6 shadow-sm rounded-xl">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-primary">10,000+</h3>
                  <div className="text-lg font-semibold">Happy Customers</div>
                  <div className="text-muted-foreground text-sm">
                    Thousands of satisfied customers have trusted us with their car rental needs.
                  </div>
                </div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-4 border p-6 shadow-sm rounded-xl">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-primary">500+</h3>
                  <div className="text-lg font-semibold">Vehicles</div>
                  <div className="text-muted-foreground text-sm">
                    Wide selection of cars from economy to luxury, all well-maintained and reliable.
                  </div>
                </div>
              </div>

              <div className="bg-card text-card-foreground flex flex-col gap-4 border p-6 shadow-sm rounded-xl">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-primary">24/7</h3>
                  <div className="text-lg font-semibold">Customer Support</div>
                  <div className="text-muted-foreground text-sm">
                    Our dedicated team is always here to help you, anytime you need assistance.
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground">
                    At RentCar, we believe that renting a car should be simple, transparent, and accessible to everyone. Our mission is to provide the best car rental experience by offering a wide selection of vehicles, competitive pricing, and exceptional customer service.
                  </p>
                  <p className="text-muted-foreground">
                    We're committed to making your journey smoother, whether you're traveling for business or pleasure, planning a road trip, or just need a temporary replacement vehicle.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    Why Choose Us?
                  </h3>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-2">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        No hidden fees - what you see is what you pay
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Flexible rental periods from hourly to monthly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        All vehicles regularly serviced and inspected
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Easy online booking and management
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 RentCar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
