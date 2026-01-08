import { render, screen, waitFor, fireEvent } from "./test-utils";
import CarsPage from "../src/pages/cars";
import { carsApi } from "../src/lib/api";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../src/lib/api", () => ({
  carsApi: {
    getAll: vi.fn(),
  },
}));

const mockCars = [
  {
    _id: "1",
    name: "911 Carrera",
    brand: "Porsche",
    year: 2023,
    pricePerDay: 500,
    fuelType: "Gasoline",
    seats: 4,
    transmission: "Automatic",
    image: "car-1.jpg",
    available: true,
  },
  {
    _id: "2",
    name: "M4 Competition",
    brand: "BMW",
    year: 2023,
    pricePerDay: 400,
    fuelType: "Gasoline",
    seats: 4,
    transmission: "Automatic",
    image: "car-2.jpg",
    available: false,
  },
];

describe("CarsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("powinien wyświetlić stan ładowania (Loader2) na początku", () => {
    (carsApi.getAll as any).mockReturnValue(new Promise(() => {}));
    const { container } = render(<CarsPage />);
    const loader = container.querySelector(".animate-spin");
    expect(loader).toBeInTheDocument();
  });

  it("powinien poprawnie wyświetlić listę aut po pobraniu danych z API", async () => {
    (carsApi.getAll as any).mockResolvedValue({ data: mockCars });

    render(<CarsPage />);

    await waitFor(() => {
      expect(screen.getByText("911 Carrera")).toBeInTheDocument();
      expect(screen.getByText("M4 Competition")).toBeInTheDocument();
    });

    expect(screen.getByText("$500/day")).toBeInTheDocument();
    expect(screen.getByText("$400/day")).toBeInTheDocument();
  });

  it("powinien przefiltrować listę po kliknięciu w przycisk marki", async () => {
    (carsApi.getAll as any).mockResolvedValue({ data: mockCars });

    render(<CarsPage />);

    await waitFor(() => screen.getByText("911 Carrera"));

    const bmwBtn = screen.getByRole("button", { name: /bmw/i });
    fireEvent.click(bmwBtn);

    await waitFor(
      () => {
        expect(screen.queryByText("911 Carrera")).not.toBeInTheDocument();
        expect(screen.getByText("M4 Competition")).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("przycisk 'Rent' powinien być wyłączony, gdy auto jest niedostępne", async () => {
    (carsApi.getAll as any).mockResolvedValue({ data: mockCars });

    render(<CarsPage />);

    await waitFor(() => {
      const rentButtons = screen.getAllByRole("button", { name: /rent/i });
      expect(rentButtons[1]).toBeDisabled();
      expect(screen.getByText("Unavailable")).toBeInTheDocument();
    });
  });

  it("powinien obsłużyć błąd pobierania danych z API", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (carsApi.getAll as any).mockRejectedValue(new Error("Network Error"));

    render(<CarsPage />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to fetch cars",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
