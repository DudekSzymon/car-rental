import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Car, Users, Award, Target, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const navigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

          {/* Center Navigation */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            <Button variant="ghost" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => navigate("/about")}>
              About
            </Button>
          </nav>

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

      {/* Hero Section */}
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

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-card rounded-2xl p-8 lg:p-10 border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  To provide seamless, affordable, and high-quality car rental
                  experiences that empower people to explore the world on their
                  own terms. We believe everyone deserves access to reliable
                  transportation without the hassle.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 lg:p-10 border shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                  To become the world's most trusted car rental platform by
                  combining cutting-edge technology with exceptional customer
                  service. We're building a future where renting a car is as
                  easy as a tap on your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-semibold text-primary">
                Our Values
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What drives us forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every service we
              provide
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Heart,
                title: "Customer First",
                description:
                  "Your satisfaction is our top priority. We go above and beyond to ensure every rental experience exceeds expectations.",
              },
              {
                icon: Shield,
                title: "Trust & Safety",
                description:
                  "We maintain the highest standards of vehicle safety and transparent pricing. No hidden fees, no surprises.",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We're building a community of travelers and adventurers. Your feedback shapes our service and helps us grow.",
              },
              {
                icon: Target,
                title: "Innovation",
                description:
                  "We constantly evolve our platform with the latest technology to make car rental faster, easier, and more convenient.",
              },
              {
                icon: Award,
                title: "Quality",
                description:
                  "Every vehicle in our fleet is carefully maintained and inspected to ensure you get the best driving experience.",
              },
              {
                icon: Car,
                title: "Flexibility",
                description:
                  "Choose from a wide range of vehicles and rental options that fit your needs and budget. Rent by the hour, day, or week.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
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
