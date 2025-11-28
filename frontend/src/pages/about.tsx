import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Award, Target, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import about1 from "@/assets/images/about-1.jpg";
import about2 from "@/assets/images/about-2.jpg";
import aboutVal1 from "@/assets/images/about-1-values.jpg";
import aboutVal2 from "@/assets/images/about-2-values.jpg";
import aboutVal3 from "@/assets/images/about-3-values.jpg";
import aboutVal4 from "@/assets/images/about-4-values.jpg";

export default function AboutPage() {
  const [about1Loaded, setAbout1Loaded] = useState(false);
  const [about2Loaded, setAbout2Loaded] = useState(false);

  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background">
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

      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            We're revolutionizing{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              car rental
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            RentCar is your trusted partner for convenient, affordable, and
            reliable car rental services. We're committed to making your journey
            exceptional from start to finish.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center text-center gap-4 md:gap-5">
              <p className="text-sm font-normal text-muted-foreground">
                Our Story
              </p>
              <h2 className="tracking-tight text-4xl font-semibold md:max-w-xl">
                Building the future of car rental
              </h2>
            </div>

            <Tabs
              defaultValue="mission"
              className="flex flex-col items-center gap-8 md:gap-6"
            >
              <TabsList>
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="vision">Our Vision</TabsTrigger>
              </TabsList>

              <TabsContent value="mission" className="flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                  <div className="flex flex-col items-start justify-between p-6 gap-12 rounded-2xl [background:linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%),rgb(245,245,245)] dark:[background:linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),rgb(38,38,38)]">
                    <div className="flex flex-col items-start gap-6 self-stretch">
                      <div className="flex w-10 h-10 justify-center items-center rounded-md border border-border bg-background shadow-sm">
                        <Target className="h-6 w-6" />
                      </div>
                      <p className="self-stretch text-foreground text-[30px] font-semibold leading-9 tracking-[-0.6px]">
                        Empowering your journey
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-6 self-stretch">
                      <p className="text-muted-foreground text-base font-normal leading-6 tracking-[-0.16px]">
                        To provide seamless, affordable, and high-quality car
                        rental experiences that empower people to explore the
                        world on their own terms. We believe everyone deserves
                        access to reliable transportation without the hassle.
                      </p>
                      <Button size="lg">Get started</Button>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl border">
                    <img
                      src={about1}
                      alt="Car rental experience"
                      onLoad={() => setAbout1Loaded(true)}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out",
                        about1Loaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="vision" className="flex-1 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                  <div className="flex flex-col items-start justify-between p-6 gap-12 rounded-2xl [background:linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%),rgb(245,245,245)] dark:[background:linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%),rgb(38,38,38)]">
                    <div className="flex flex-col items-start gap-6 self-stretch">
                      <div className="flex w-10 h-10 justify-center items-center rounded-md border border-border bg-background shadow-sm">
                        <Award className="h-6 w-6" />
                      </div>
                      <p className="self-stretch text-foreground text-[30px] font-semibold leading-9 tracking-[-0.6px]">
                        The future of mobility
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-6 self-stretch">
                      <p className="text-muted-foreground text-base font-normal leading-6 tracking-[-0.16px]">
                        To become the world's most trusted car rental platform
                        by combining cutting-edge technology with exceptional
                        customer service. We're building a future where renting
                        a car is as easy as a tap on your phone.
                      </p>
                      <Button size="lg">Learn more</Button>
                    </div>
                  </div>
                  <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl border">
                    <img
                      src={about2}
                      alt="Future of car rental"
                      onLoad={() => setAbout2Loaded(true)}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out",
                        about2Loaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      )}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-normal text-muted-foreground mb-4">
              Our Values
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What drives us forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every service we
              provide
            </p>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            <div className="bg-card text-card-foreground flex flex-col justify-between border shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden lg:row-span-2 h-full group pt-8">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="px-6 flex flex-col gap-2 relative z-10 shrink-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Customer First</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your satisfaction is our top priority. We go above and beyond
                  to ensure every rental experience exceeds expectations.
                </p>
              </div>

              <div className="mt-6 w-full flex-1 relative overflow-hidden min-h-[250px]">
                <div className="absolute inset-0 w-full h-full px-6 pb-6 flex flex-col justify-end items-center">
                  <img
                    src={aboutVal1}
                    alt="Customer First"
                    className="w-full h-full object-cover shadow-2xl border rounded-lg rotate-2 scale-95 hover:scale-100 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 w-full h-1/2 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none"></div>
              </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Trust & Safety</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We maintain the highest standards of vehicle safety and
                  transparent pricing. No hidden fees.
                </p>
              </div>
              <div className="px-6 flex h-full flex-col z-10 items-center justify-center">
                <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-xl">
                  <img
                    src={aboutVal2}
                    alt="Trust and Safety"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 w-full h-1/3 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none"></div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 border py-8 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden lg:col-start-2 lg:row-2 md:col-1 md:row-3 group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="flex flex-col gap-2 px-6 relative z-10">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Quality</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every vehicle in our fleet is carefully maintained and
                  inspected to ensure the best experience.
                </p>
              </div>
              <div className="px-6 flex h-full flex-col z-10 items-center justify-center mt-2">
                <div className="w-full h-[200px] overflow-hidden rounded-xl shadow-xl">
                  <img
                    src={aboutVal3}
                    alt="Quality"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 w-full h-1/3 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none"></div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col justify-between border shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full relative overflow-hidden lg:col-start-3 lg:row-span-2 lg:row-start-1 md:col-2 md:row-span-2 md:row-start-2 group pt-8">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              <div className="px-6 flex flex-col gap-2 relative z-10 shrink-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Flexibility</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose from a wide range of vehicles and rental options that
                  fit your needs. Rent by the hour, day, or week.
                </p>
              </div>

              {/* Zdjęcie POPRAWIONE - teraz ma marginesy i ramkę jak to po lewej */}
              <div className="mt-6 w-full flex-1 relative overflow-hidden min-h-[250px]">
                <div className="absolute inset-0 w-full h-full px-6 pb-6 flex flex-col justify-end items-center">
                  <img
                    src={aboutVal4}
                    alt="Flexibility"
                    className="w-full h-full object-cover shadow-2xl border rounded-lg -rotate-2 scale-95 hover:scale-100 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 w-full h-1/2 blur-[60px] opacity-40 [background:radial-gradient(circle_at_center,hsl(var(--primary))_0%,transparent_70%)] pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-linear-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 mask-image:radial-gradient(white,transparent_85%)" />
            <div className="relative z-10 flex flex-col gap-6 items-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                Ready to start your journey?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl">
                Join RentCar today and experience the future of car rental
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-background text-foreground hover:bg-background/90 px-8 h-12 text-base font-semibold shadow-xl mt-4"
              >
                Get started now
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
