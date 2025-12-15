import * as React from "react";
import {
  IconDashboard,
  IconCar,
  IconUsers,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const adminMenu = [
    { title: "Przegląd", url: "/admin", icon: IconDashboard },
    { title: "Flota Pojazdów", url: "/admin/cars", icon: IconCar },
    { title: "Rezerwacje", url: "/admin/rentals", icon: IconCalendarEvent },
    { title: "Użytkownicy", url: "/admin/users", icon: IconUsers },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="font-bold text-lg text-primary">Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminMenu.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser
            user={{
              name: user.firstName,
              email: user.email,
              avatar: user.avatar || "",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
