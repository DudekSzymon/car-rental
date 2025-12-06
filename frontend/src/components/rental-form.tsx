import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TermsPrivacyModal } from "@/components/terms-privacy-modal";

interface CarData {
  _id: string;
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

  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    street: "",
    houseNumber: "",
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
      const start = new Date(formData.pickupDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(formData.returnDate);
      end.setHours(0, 0, 0, 0);

      const diff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diff === 0) return 1;
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
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.houseNumber.trim())
      newErrors.houseNumber = "House number is required";
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
      const rentalData = {
        carId: car._id,
        startDate: formData.pickupDate,
        endDate: formData.returnDate,
        totalPrice: totalPrice,
        driverDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          licenseNumber: formData.licenseNumber,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
        },
      };
      navigate("/payment", { state: { rentalData } });
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
        onClick={() => navigate(`/cars/${car._id}`)}
        className="mb-6 pl-0 hover:pl-2 transition-all"
        type="button"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to car details
      </Button>

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Reservation
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Your Details</CardTitle>
              <CardDescription>
                Fill in your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
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
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
              </div>

              <div className="h-px bg-border my-4" />

              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    placeholder="Street"
                    className={cn(
                      submitted && errors.street && "border-destructive"
                    )}
                  />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="houseNumber">No.</Label>
                  <Input
                    id="houseNumber"
                    value={formData.houseNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, houseNumber: e.target.value })
                    }
                    placeholder="No."
                    className={cn(
                      submitted && errors.houseNumber && "border-destructive"
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
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
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Reservation Details
              </CardTitle>
              <CardDescription>Select dates and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
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
                          : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate}
                        onSelect={(date) =>
                          setFormData({ ...formData, pickupDate: date })
                        }
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
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
                          : "Select date"}
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
                          date <
                          (formData.pickupDate ||
                            new Date(new Date().setHours(0, 0, 0, 0)))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Driver's License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, licenseNumber: e.target.value })
                  }
                  placeholder="License Number"
                  className={cn(
                    submitted && errors.licenseNumber && "border-destructive"
                  )}
                />
              </div>

              <div className="space-y-2">
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
                    className="w-full text-center"
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
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    Additional fee: ${(formData.driversCount - 1) * 100}
                  </p>
                )}
              </div>

              <div className="h-px bg-border my-4" />

              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  INVOICE DATA (OPTIONAL)
                </h3>
                <p className="text-xs text-muted-foreground -mt-3">
                  (Fill in if you need a VAT invoice)
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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

                <div className="space-y-2">
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
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
            </CardContent>
          </Card>

          <Card className="shadow-xl border-primary/20 bg-muted/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Summary & Payment
              </CardTitle>
              <CardDescription>Review costs and proceed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                  Selected Car
                </p>
                <div className="flex items-center gap-3 bg-background p-3 rounded-lg border">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{car.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {car.brand} • {car.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Rental duration:
                  </span>
                  <span className="font-medium">{days} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price per day:</span>
                  <span className="font-medium">${car.pricePerDay}</span>
                </div>
                {additionalDriverFee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Extra drivers fee:</span>
                    <span>+${additionalDriverFee}</span>
                  </div>
                )}
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              <div className="bg-background rounded-lg border p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(c) =>
                      setFormData({ ...formData, termsAccepted: c === true })
                    }
                    className={cn(
                      submitted && errors.termsAccepted && "border-destructive"
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="termsAccepted"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By clicking accept, you agree to our{" "}
                      <button
                        type="button"
                        onClick={() => setTermsOpen(true)}
                        className="underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={() => setPrivacyOpen(true)}
                        className="underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        Privacy Policy
                      </button>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base font-semibold shadow-lg mt-4"
                disabled={days === 0 && calculateDays() === 0}
              >
                Go to Payment
                <CreditCard className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>

      <TermsPrivacyModal
        open={termsOpen}
        onOpenChange={setTermsOpen}
        type="terms"
      />
      <TermsPrivacyModal
        open={privacyOpen}
        onOpenChange={setPrivacyOpen}
        type="privacy"
      />
    </>
  );
}
