import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
              Zaloguj się
            </Button>
            <Button onClick={() => navigate("/register")}>
              Załóż konto
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Wynajmij auto{" "}
            <span className="text-primary">w kilka sekund</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Szeroki wybór pojazdów, przejrzyste ceny i błyskawiczna rezerwacja.
            Twoja przygoda zaczyna się tutaj.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate("/register")} className="text-lg px-8">
              Rozpocznij teraz
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")} className="text-lg px-8">
              Mam już konto
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dlaczego my?
            </h2>
            <p className="text-lg text-muted-foreground">
              Proste rozwiązanie dla Twoich potrzeb transportowych
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Błyskawiczna rezerwacja</CardTitle>
                <CardDescription>
                  Zarezerwuj auto w mniej niż 2 minuty. Bez zbędnych formalności i papierologii.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Szeroki wybór</CardTitle>
                <CardDescription>
                  Od kompaktowych aut miejskich po luksusowe SUV-y. Znajdziesz idealne auto dla siebie.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Bezpieczne płatności</CardTitle>
                <CardDescription>
                  Twoje dane są chronione najwyższymi standardami bezpieczeństwa.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-12">
              <div className="text-center space-y-6">
                <div className="inline-flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Gotowy na start?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dołącz do tysięcy zadowolonych klientów i zarezerwuj swój samochód już dziś.
                </p>
                <div className="pt-4">
                  <Button size="lg" onClick={() => navigate("/register")} className="text-lg px-8">
                    Załóż darmowe konto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CarRental. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
