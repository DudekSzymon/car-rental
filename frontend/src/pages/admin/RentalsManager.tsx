import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Car as CarIcon } from "lucide-react";

interface Rental {
  _id: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  car: {
    brand: string;
    name: string;
    image: string;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  // Dodano informację o tym, kto zmodyfikował status
  lastModifiedBy?: {
    firstName: string;
    lastName: string;
  };
}

export default function RentalsManager() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      const res = await adminApi.getAllRentals();
      setRentals(res.data || []);
    } catch (error) {
      toast.error("Error fetching rentals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await adminApi.updateRentalStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);

      // Aktualizujemy lokalny stan danymi z serwera (zawierającymi lastModifiedBy)
      setRentals(
        rentals.map((r) =>
          r._id === id
            ? {
                ...r,
                status: newStatus,
                lastModifiedBy: res.data.lastModifiedBy,
              }
            : r,
        ),
      );
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-8 p-1">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Rentals <span className="text-primary">Management</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor and update rental statuses.
        </p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Car</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Modified By</TableHead> {/* Nowa kolumna */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  No rentals found.
                </TableCell>
              </TableRow>
            ) : (
              rentals.map((rental) => (
                <TableRow key={rental._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 bg-muted rounded overflow-hidden">
                        {rental.car ? (
                          <img
                            src={
                              rental.car.image.startsWith("data")
                                ? rental.car.image
                                : `/src/assets/images/${rental.car.image}`
                            }
                            alt="car"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <CarIcon className="p-2" />
                        )}
                      </div>
                      <span className="font-medium">
                        {rental.car
                          ? `${rental.car.brand} ${rental.car.name}`
                          : "Car Removed"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">
                        {rental.user.firstName} {rental.user.lastName}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {rental.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground text-xs">
                          From:
                        </span>
                        {new Date(rental.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground text-xs">
                          To:
                        </span>
                        {new Date(rental.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    ${rental.totalPrice}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(rental.status)}
                    >
                      {rental.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {rental.lastModifiedBy ? (
                      <div className="flex flex-col text-xs">
                        <span className="font-medium">
                          {rental.lastModifiedBy.firstName}{" "}
                          {rental.lastModifiedBy.lastName}
                        </span>
                        <span className="text-muted-foreground italic text-[10px]">
                          Administrator
                        </span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">
                        Initial / System
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={rental.status}
                      onValueChange={(val) =>
                        handleStatusChange(rental._id, val)
                      }
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
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
