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
    if (!confirm("Czy na pewno chcesz usunąć to auto?")) return;
    try {
      await adminApi.deleteCar(id);
      toast.success("Auto usunięte");
      fetchCars();
    } catch (err) {
      toast.error("Błąd podczas usuwania");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Zarządzanie Flotą</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Dodaj Auto
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nazwa</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead>Cena/dzień</TableHead>
              <TableHead>Akcje</TableHead>
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
