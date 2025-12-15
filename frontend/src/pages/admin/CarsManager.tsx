import { useEffect, useState } from "react";
import { carsApi, adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Trash2,
  Plus,
  Car as CarIcon,
  Loader2,
  Fuel,
  Gauge,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

import car1Image from "@/assets/images/car-1.jpg";
import car2Image from "@/assets/images/car-2.jpg";
import car3Image from "@/assets/images/car-3.jpg";
import car4Image from "@/assets/images/car-4.jpg";
import car5Image from "@/assets/images/car-5.jpg";
import car6Image from "@/assets/images/car-6.jpg";

const imageMap: Record<string, string> = {
  "car-1.jpg": car1Image,
  "car-2.jpg": car2Image,
  "car-3.jpg": car3Image,
  "car-4.jpg": car4Image,
  "car-5.jpg": car5Image,
  "car-6.jpg": car6Image,
};

interface Car {
  _id: string;
  name: string;
  brand: string;
  year: number;
  pricePerDay: number;
  transmission: string;
  image: string;
  fuelType?: string;
}

export default function CarsManager() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [imageMode, setImageMode] = useState<"preset" | "upload">("preset");

  const [newCar, setNewCar] = useState({
    brand: "",
    name: "",
    year: "",
    pricePerDay: "",
    transmission: "Manual",
    image: "car-1.jpg",
  });

  const fetchCars = async () => {
    try {
      const res = await carsApi.getAll();
      const data = Array.isArray(res.data) ? res.data : [];
      setCars(data);
    } catch (error) {
      toast.error("Error fetching fleet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this vehicle?")) return;
    try {
      await adminApi.deleteCar(id);
      toast.success("Vehicle removed successfully");
      fetchCars();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error deleting vehicle");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Zapisujemy wynik (Base64 string) do pola image
        setNewCar({ ...newCar, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!newCar.brand || !newCar.name || !newCar.pricePerDay) {
      return toast.error("Please fill in Brand, Model and Price fields.");
    }

    try {
      await adminApi.createCar({
        ...newCar,
        year: Number(newCar.year),
        pricePerDay: Number(newCar.pricePerDay),
      });
      toast.success("New vehicle added successfully!");

      setNewCar({
        brand: "",
        name: "",
        year: "",
        pricePerDay: "",
        transmission: "Manual",
        image: "car-1.jpg",
      });
      setImageMode("preset");
      setIsSheetOpen(false);
      fetchCars();
    } catch (error: any) {
      toast.error(
        "Error adding vehicle: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const getCarImageSrc = (imgString: string) => {
    if (imgString.startsWith("data:image")) return imgString;
    return imageMap[imgString] || car1Image;
  };

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Fleet{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your vehicle inventory and pricing.
          </p>
        </div>

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="shadow-lg">
              <Plus className="mr-2 h-5 w-5" /> Add New Vehicle
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-md overflow-y-auto p-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl">Add Vehicle</SheetTitle>
              <SheetDescription>
                Enter the details for the new car.
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="Toyota"
                    value={newCar.brand}
                    onChange={(e) =>
                      setNewCar({ ...newCar, brand: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Model</Label>
                  <Input
                    id="name"
                    placeholder="Corolla"
                    value={newCar.name}
                    onChange={(e) =>
                      setNewCar({ ...newCar, name: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="2024"
                    value={newCar.year}
                    onChange={(e) =>
                      setNewCar({ ...newCar, year: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price / Day ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="150"
                    value={newCar.pricePerDay}
                    onChange={(e) =>
                      setNewCar({ ...newCar, pricePerDay: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-start">
                <div className="space-y-2">
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    value={newCar.transmission}
                    onValueChange={(val) =>
                      setNewCar({ ...newCar, transmission: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manual">Manual</SelectItem>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="image">Image Source</Label>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant={imageMode === "preset" ? "default" : "outline"}
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setImageMode("preset")}
                        title="Choose from list"
                      >
                        <ImageIcon className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant={imageMode === "upload" ? "default" : "outline"}
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setImageMode("upload")}
                        title="Upload file"
                      >
                        <Upload className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {imageMode === "preset" ? (
                    <Select
                      value={
                        !newCar.image.startsWith("data:")
                          ? newCar.image
                          : "car-1.jpg"
                      }
                      onValueChange={(val) =>
                        setNewCar({ ...newCar, image: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select file" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(imageMap).map((imgKey) => (
                          <SelectItem key={imgKey} value={imgKey}>
                            {imgKey}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      onChange={handleFileUpload}
                    />
                  )}

                  {imageMode === "upload" &&
                    newCar.image.startsWith("data:") && (
                      <p className="text-[10px] text-emerald-600 font-medium truncate">
                        ✓ Image loaded successfully
                      </p>
                    )}
                </div>
              </div>
            </div>

            <SheetFooter className="mt-8">
              <Button
                type="submit"
                onClick={handleCreate}
                className="w-full"
                size="lg"
              >
                Add to Fleet
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Vehicle Details</TableHead>
              <TableHead>Specs</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-16 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <CarIcon className="h-10 w-10 opacity-20" />
                    <p>No vehicles found in your fleet.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <TableRow
                  key={car._id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-20 rounded-md overflow-hidden bg-muted relative border shadow-sm">
                        <img
                          src={getCarImageSrc(car.image)}
                          className="w-full h-full object-cover"
                          alt={car.name}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {car.brand} {car.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-3 w-3" />
                        <span>{car.transmission}</span>
                      </div>
                      {car.fuelType && (
                        <div className="flex items-center gap-2">
                          <Fuel className="h-3 w-3" />
                          <span>{car.fuelType}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>{car.year}</TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      Available
                    </Badge>
                  </TableCell>

                  <TableCell className="font-bold text-primary">
                    ${car.pricePerDay}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(car._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
