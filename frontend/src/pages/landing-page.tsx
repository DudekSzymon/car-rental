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
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-background">
        <div className="container mx-auto max-w-full md:max-w-7xl md:px-6 md:py-4 py-3 px-6">
          <div className="flex justify-between gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">RentCar</span>
            </div>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/register")}>Sign up</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-hidden">
        <div className="container mx-auto max-w-full md:max-w-5xl md:py-24 lg:px-0 py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:px-6">
            <div className="flex flex-col gap-6 sm:gap-8 items-start justify-center">
              <div className="flex gap-4 sm:gap-6 flex-col">
                <h1 className="tracking-tight text-5xl md:text-6xl font-semibold text-balance">
                  <span className="pr-4">Rent a car</span>
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

              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-2">
                  <Check className="size-5" />
                  <span className="text-base font-medium">
                    Lightning-fast booking
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5" />
                  <span className="text-base font-medium">
                    Wide selection of vehicles
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-5" />
                  <span className="text-base font-medium">
                    Secure and transparent payments
                  </span>
                </li>
              </ul>

              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="px-6"
              >
                Get started
              </Button>
            </div>

            <div className="w-full grid grid-cols-1 grid-rows-1 place-items-center relative">
              {/* Glow effect */}
              <div className="holo col-span-full row-span-full w-[327px] aspect-square -z-1 blur-[80px] scale-[1.22] bg-[radial-gradient(ellipse_110%_148%_at_-18%_12%,_#fffeb0_0%,_#f6ffb3_20%,_#cfffae_38%,_#adffe1_57%,_#ace5ff_72%,_#b6b6ff_89%,_#f9b8ff_100%)]"></div>

              {/* Hero image */}
              <div className="relative col-span-full row-span-full">
                <img
                  src={landingHero}
                  alt="Car rental hero"
                  onLoad={() => setHeroLoaded(true)}
                  className={cn(
                    "max-w-[327px] [filter:drop-shadow(0px_4px_8px_rgba(0,0,0,0.2))_drop-shadow(0px_8px_16px_rgba(0,0,0,0.04))] transition-opacity duration-700 ease-in-out dark:brightness-[0.2] dark:grayscale rounded-xl",
                    heroLoaded ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto max-w-full md:max-w-7xl md:px-6 md:py-24 py-16 px-6 flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 md:gap-5">
            <p className="text-sm font-normal text-muted-foreground">
              Features
            </p>
            <h2 className="tracking-tight text-4xl font-semibold md:max-w-[576px]">
              Everything you need to rent your perfect car
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl relative overflow-hidden md:row-span-2 h-full">
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
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
                  className="shadow-lg border-1 rotate-2 scale-[0.85]"
                />
              </div>
              <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(circle_at_-30%_60%,_#FFEEB0_0%,_#F6FFB3_20%,_#CFFFFA_38%,_#ADDEFF_57%,_#ACE5FF_72%,_#B6B6FF_89%,_#F9B8FF_100%)]"></div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl h-full relative overflow-hidden">
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <div className="text-lg font-semibold">
                  Multiple locations
                </div>
                <div className="text-muted-foreground text-sm">
                  Pick up and drop off at any of our convenient locations
                  across the city.
                </div>
              </div>
              <div className="px-6 flex h-full flex-col z-1 items-center">
                <img
                  src={landing2}
                  alt="Multiple locations"
                  width="400"
                  height="282"
                  loading="lazy"
                  decoding="async"
                  className="scale-[0.85]"
                />
              </div>
              <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(circle_at_-30%_200%,_#FFEEB0_0%,_#F6FFB3_20%,_#CFFFFA_38%,_#ADDEFF_57%,_#ACE5FF_72%,_#B6B6FF_89%,_#F9B8FF_100%)]"></div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm rounded-xl h-full relative overflow-hidden lg:col-start-2 lg:row-2 md:col-1 md:row-3">
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <div className="text-lg font-semibold">Flexible payments</div>
                <div className="text-muted-foreground text-sm">
                  Pay with credit card, debit card, or digital wallets. We
                  accept all major payment methods.
                </div>
              </div>
              <div className="px-6 flex h-full flex-col z-1 items-center">
                <img
                  src={landing3}
                  alt="Flexible payments"
                  width="400"
                  height="282"
                  loading="lazy"
                  decoding="async"
                  className="scale-[0.85]"
                />
              </div>
              <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(ellipse_100%_200%_at_120%_150%,_#FFEEB0_0%,_#F6FFB3_20%,_#CFFFFA_38%,_#ADDEFF_57%,_#ACE5FF_72%,_#B6B6FF_89%,_#F9B8FF_100%)]"></div>
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
              <div className="absolute bottom-0 w-full h-[28.27%] blur-[50px] origin-center [background:radial-gradient(ellipse_100%_250%_at_100%_100%,_rgb(255,_238,_176)_0%,_rgb(246,_255,_179)_20%,_rgb(207,_255,_250)_38%,_rgb(173,_222,_255)_57%,_rgb(172,_229,_255)_72%,_rgb(182,_182,_255)_89%,_rgb(249,_184,_255)_100%)]"></div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container mx-auto max-w-full md:max-w-7xl md:px-6 md:py-24 py-16 px-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 RentCar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
