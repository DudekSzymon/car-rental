import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Car,
  ArrowLeft,
  CalendarIcon,
  Minus,
  Plus,
  Clock,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CarData {
  id: number;
  name: string;
  brand: string;
  year: number;
  pricePerDay: number;
  available: boolean;
  deposit: number;
  dailyLimit: number;
  extraKmFee: number;
}

interface RentalFormProps {
  car: CarData;
}

export function RentalForm({ car }: RentalFormProps) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
    pickupDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    licenseNumber: "",
    licenseConfirmed: false,
    driversCount: 1,
    companyName: "",
    taxId: "",
    invoiceAddress: "",
    invoicePostalCode: "",
    invoiceCity: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const diff = Math.ceil(
        (formData.returnDate.getTime() - formData.pickupDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const days = calculateDays();
  const additionalDriverFee = (formData.driversCount - 1) * 100;
  const basePrice = days * car.pricePerDay;
  const totalPrice = basePrice + additionalDriverFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Start date is required";
    if (!formData.returnDate) newErrors.returnDate = "End date is required";
    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      alert("Reservation submitted! (Demo)");
      navigate("/cars");
    }
  };

  const incrementDrivers = () => {
    if (formData.driversCount < 5) {
      setFormData({ ...formData, driversCount: formData.driversCount + 1 });
    }
  };

  const decrementDrivers = () => {
    if (formData.driversCount > 1) {
      setFormData({ ...formData, driversCount: formData.driversCount - 1 });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => navigate(`/cars/${car.id}`)}
        className="mb-6"
        type="button"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to car details
      </Button>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Reservation
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                  className={cn(
                    submitted && errors.firstName && "border-destructive"
                  )}
                />
                {submitted && errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  className={cn(
                    submitted && errors.lastName && "border-destructive"
                  )}
                />
                {submitted && errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                  className={cn(
                    submitted && errors.phone && "border-destructive"
                  )}
                />
                {submitted && errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address*</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email Address"
                  className={cn(
                    submitted && errors.email && "border-destructive"
                  )}
                />
                {submitted && errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address">Address*</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Address"
                  className={cn(
                    submitted && errors.address && "border-destructive"
                  )}
                />
                {submitted && errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="postalCode">Postal Code*</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    placeholder="Postal Code"
                    className={cn(
                      submitted && errors.postalCode && "border-destructive"
                    )}
                  />
                  {submitted && errors.postalCode && (
                    <p className="text-sm text-destructive">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city">City*</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="City"
                    className={cn(
                      submitted && errors.city && "border-destructive"
                    )}
                  />
                  {submitted && errors.city && (
                    <p className="text-sm text-destructive">{errors.city}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Your Reservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start Date*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.pickupDate && "text-muted-foreground",
                          submitted && errors.pickupDate && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate
                          ? format(formData.pickupDate, "MM/dd/yyyy")
                          : "-- / -- / ----"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate}
                        onSelect={(date) =>
                          setFormData({ ...formData, pickupDate: date })
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {submitted && errors.pickupDate && (
                    <p className="text-sm text-destructive">
                      {errors.pickupDate}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>End Date*</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.returnDate && "text-muted-foreground",
                          submitted && errors.returnDate && "border-destructive"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.returnDate
                          ? format(formData.returnDate, "MM/dd/yyyy")
                          : "-- / -- / ----"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.returnDate}
                        onSelect={(date) =>
                          setFormData({ ...formData, returnDate: date })
                        }
                        disabled={(date) =>
                          date < (formData.pickupDate || new Date())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {submitted && errors.returnDate && (
                    <p className="text-sm text-destructive">
                      {errors.returnDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="licenseNumber">Driver's License Number*</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      licenseNumber: e.target.value,
                    })
                  }
                  placeholder="Driver's License Number"
                  className={cn(
                    submitted && errors.licenseNumber && "border-destructive"
                  )}
                />
                {submitted && errors.licenseNumber && (
                  <p className="text-sm text-destructive">
                    {errors.licenseNumber}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Number of Drivers</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={decrementDrivers}
                    disabled={formData.driversCount <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    value={formData.driversCount}
                    readOnly
                    className="w-20 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={incrementDrivers}
                    disabled={formData.driversCount >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.driversCount > 1 && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Additional driver fee: ${(formData.driversCount - 1) * 100}
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-1">Invoice Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  (Fill in if you need a VAT invoice)
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="taxId">Tax ID</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) =>
                        setFormData({ ...formData, taxId: e.target.value })
                      }
                      placeholder="Tax ID"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="invoiceAddress">Address</Label>
                    <Input
                      id="invoiceAddress"
                      value={formData.invoiceAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          invoiceAddress: e.target.value,
                        })
                      }
                      placeholder="Address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="invoicePostalCode">Postal Code</Label>
                      <Input
                        id="invoicePostalCode"
                        value={formData.invoicePostalCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            invoicePostalCode: e.target.value,
                          })
                        }
                        placeholder="Postal Code"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="invoiceCity">City</Label>
                      <Input
                        id="invoiceCity"
                        value={formData.invoiceCity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            invoiceCity: e.target.value,
                          })
                        }
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Summary & Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  CAR
                </p>
                <div className="flex items-center gap-3">
                  <Car className="h-6 w-6 text-primary" />
                  <span className="font-medium">{car.name}</span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  GENERAL TERMS
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <span>Deposit of ${car.deposit} payable in cash</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <span>Daily limit: {car.dailyLimit} km</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <span>Extra km fee: ${car.extraKmFee.toFixed(2)}/km</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      termsAccepted: checked === true,
                    })
                  }
                  className={cn(
                    submitted && errors.termsAccepted && "border-destructive"
                  )}
                />
                <div>
                  <Label
                    htmlFor="termsAccepted"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I agree to the above terms
                  </Label>
                  <button
                    type="button"
                    className="block text-sm text-primary hover:underline"
                  >
                    Accept requirements
                  </button>
                </div>
              </div>
              {submitted && errors.termsAccepted && (
                <p className="text-sm text-destructive">
                  {errors.termsAccepted}
                </p>
              )}

              <Separator />

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-muted-foreground mb-1">
                  RENTAL PRICE
                </p>
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-3xl font-bold">
                    {days > 0 ? `$${totalPrice}` : "-- "}
                  </span>
                  <span className="text-sm text-muted-foreground">gross</span>
                </div>
                {days > 0 && (
                  <p className="text-sm text-muted-foreground text-right mt-1">
                    {days} {days === 1 ? "day" : "days"} × ${car.pricePerDay}
                    /day
                    {additionalDriverFee > 0 &&
                      ` + $${additionalDriverFee} (extra drivers)`}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">
                  PAYMENT METHOD
                </p>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-background">
                  <CreditCard className="h-8 w-8 text-primary" />
                  <span className="font-medium">Online Payment</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-semibold"
                disabled={days === 0}
              >
                Pay Online
                <span className="ml-2">→</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </>
  );
}
