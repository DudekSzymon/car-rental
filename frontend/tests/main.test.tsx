import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../src/components/navbar";
import { LoginForm } from "../src/components/login-form";
import { cn } from "../src/lib/utils";
import * as AuthContext from "../src/context/AuthContext";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("RentCar Frontend Tests", () => {
  describe("Navbar", () => {
    it("should render navigation links", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<Navbar />);

      expect(screen.getByText("RentCar")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Cars")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
    });

    it("should show login buttons when not authenticated", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<Navbar />);

      expect(screen.getByText("Log in")).toBeInTheDocument();
      expect(screen.getByText("Sign up")).toBeInTheDocument();
    });

    it("should show logout button when authenticated", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john@test.com",
        },
        token: "mock-token",
        isLoading: false,
        isAuthenticated: true,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<Navbar />);

      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.queryByText("Log in")).not.toBeInTheDocument();
    });
  });

  describe("LoginForm", () => {
    it("should render all form fields", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<LoginForm />);

      expect(screen.getByText("Welcome back")).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /^login$/i })
      ).toBeInTheDocument();
    });

    it("should require email and password fields", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<LoginForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    it("should call login function with form data", async () => {
      const mockLogin = vi.fn();
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: mockLogin,
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      const user = userEvent.setup();
      render(<LoginForm />);

      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "password123");

      const submitButton = screen.getByRole("button", { name: /^login$/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(
          "test@example.com",
          "password123"
        );
      });
    });

    it("should have link to registration page", () => {
      vi.spyOn(AuthContext, "useAuth").mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        googleLogin: vi.fn(),
        register: vi.fn(),
        logout: vi.fn(),
        updateUser: vi.fn(),
      });

      render(<LoginForm />);

      const signupLink = screen.getByText(/sign up/i);
      expect(signupLink).toBeInTheDocument();
      expect(signupLink.closest("a")).toHaveAttribute("href", "/register");
    });
  });

  describe("Utils", () => {
    it("should merge class names correctly", () => {
      const result = cn("px-4", "py-2", "text-white");

      expect(result).toContain("px-4");
      expect(result).toContain("py-2");
      expect(result).toContain("text-white");
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      const isDisabled = false;

      const result = cn(
        "base-class",
        isActive && "active",
        isDisabled && "disabled"
      );

      expect(result).toContain("base-class");
      expect(result).toContain("active");
      expect(result).not.toContain("disabled");
    });

    it("should handle Tailwind conflicts", () => {
      const result = cn("px-4 py-2", "px-8");
      expect(result).toContain("px-8");
      expect(result).toContain("py-2");
    });
  });
});
