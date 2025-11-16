import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import { Car, Clock, Shield, Sparkles } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">CarRental</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/register")}>Sign up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Rent a car <span className="text-primary">in seconds</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Wide selection of vehicles, transparent pricing, and instant booking.
              Your adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="text-lg px-8"
              >
                Get started
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/login")}
                className="text-lg px-8"
              >
                I already have an account
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why us?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Simple solution for your transportation needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Lightning-fast booking</CardTitle>
                    <CardDescription>
                      Book a car in less than 2 minutes. No unnecessary
                      formalities or paperwork.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Car className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Wide selection</CardTitle>
                    <CardDescription>
                      From compact city cars to luxury SUVs. Find the perfect
                      car for you.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Secure payments</CardTitle>
                    <CardDescription>
                      Your data is protected by the highest security standards.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 bg-background">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="inline-flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to start?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied customers and book your car today.
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/register")}
                    className="text-lg px-8"
                  >
                    Create free account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CarRental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
