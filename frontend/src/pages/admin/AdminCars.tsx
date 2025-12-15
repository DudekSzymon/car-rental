import { useEffect, useState } from "react";
import { carsApi, adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

export default function AdminCars() {
  const [cars, setCars] = useState<any[]>([]);

  const fetchCars = async () => {
    const res = await carsApi.getAll();
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this car?")) return;
    try {
      await adminApi.deleteCar(id);
      toast.success("Car removed successfully");
      fetchCars();
    } catch (err) {
      toast.error("Error deleting car");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Fleet Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Car
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>${car.pricePerDay}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(car._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
