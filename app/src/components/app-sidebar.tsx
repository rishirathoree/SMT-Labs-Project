"use client";
import { Sidebar, SidebarContent, SidebarHeader, useSidebar, } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, Boxes, Handshake, Home, Infinity, Package2, PieChart, Settings, ShoppingBag, Store, TrendingUp, Warehouse, } from "lucide-react";
import type { Route } from "./nav-main";
import DashboardNavigation from "@/components/nav-main";
import { Link } from "react-router";

const dashboardRoutes: Route[] = [
  {
    id: "home",
    isSomethingNew: false,
    isDisabled: false,
    title: "Home",
    icon: <Home className="size-12" />,
    link: "/",
  },
  {
    id: "products",
    isSomethingNew: false,
    isDisabled: false,
    title: "Products",
    icon: <Warehouse className="size-12" />,
    link: "/products",
  },
  {
    id: "Categories",
    isSomethingNew: false,
    isDisabled: false,
    title: "Categories",
    icon: <Boxes className="size-12" />,
    link: "/categories",
  },
  {
    id: "Customers",
    isSomethingNew: false,
    isDisabled: false,
    title: "Teams",
    icon: <Handshake className="size-12" />,
    link: "/teams",
  },
  {
    id: "orders",
    isSomethingNew: false,
    isDisabled: false,
    title: "Orders",
    icon: <Package2 className="size-12" />,
    link: "/orders",
  },
  {
    id: "storefront",
    isSomethingNew: false,
    isDisabled: false,
    title: "Storefront",
    icon: <Store className="size-12" />,
    link: "/settings",
  },
  {
    isSomethingNew: false,
    id: "analytics",
    isDisabled: true,
    title: "Analytics",
    icon: <TrendingUp className="size-12" />,
    link: "#",
  },
  {

    isSomethingNew: false,
    id: "settings",
    isDisabled: true,
    title: "Settings",
    icon: <Settings className="size-12" />,
    link: "#",
  },
];

export function DashboardSidebar() {
  const { state, } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="inset" className="!bg-sidebar" collapsible="none">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <svg fill="none" height="48" viewBox="0 0 40 48" width="40" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m34.5868 8.40061-9.6868-2.59556c-.6687-.17919-1.2108.23679-1.2108.92911v10.02854c0 .6923.5421 1.3988 1.2108 1.578l9.6868 2.5955c.6687.1792 1.2109-.2368 1.2109-.9291v-10.02848c0-.69232-.5422-1.39882-1.2109-1.57801zm-9.6868-6.35625c-2.6749-.71674-4.8434.94718-4.8434 3.71647v10.02847c0 2.7693 2.1685 5.5953 4.8434 6.312l9.6868 2.5956c2.6749.7168 4.8434-.9472 4.8434-3.7165v-10.0284c0-2.76934-2.1685-5.59533-4.8434-6.31207z" fill="#8098f9" /><path d="m26.9812 16.5707-12.1085-3.2444c-.6687-.1792-1.2109.2368-1.2109.9291v12.5356c0 .6923.5422 1.3988 1.2109 1.578l12.1085 3.2445c.6687.1792 1.2108-.2368 1.2108-.9291v-12.5356c0-.6924-.5421-1.3989-1.2108-1.5781zm-12.1085-7.0051c-2.6749-.71674-4.8434.9472-4.8434 3.7165v12.5356c0 2.7693 2.1685 5.5953 4.8434 6.312l12.1085 3.2445c2.6749.7167 4.8433-.9472 4.8433-3.7165v-12.5356c0-2.7693-2.1684-5.5953-4.8433-6.312z" fill="#6172f3" /><path d="m19.3736 24.7409-14.53021-3.8934c-.66873-.1792-1.21085.2368-1.21085.9291v15.0428c0 .6923.54212 1.3988 1.21085 1.578l14.53021 3.8933c.6687.1792 1.2108-.2368 1.2108-.9291v-15.0427c0-.6923-.5421-1.3988-1.2108-1.578zm-14.53021-7.6541c-2.67493-.7167-4.84339.9472-4.84339 3.7165v15.0427c0 2.7693 2.16846 5.5953 4.84339 6.3121l14.53021 3.8933c2.6749.7168 4.8433-.9472 4.8433-3.7164v-15.0428c0-2.7693-2.1684-5.5953-4.8433-6.312z" fill="#444ce7" /></g></svg>        </Link>

        <motion.div
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <DashboardNavigation routes={dashboardRoutes} />
      </SidebarContent>
      {/* <SidebarFooter className="px-2">
        <TeamSwitcher teams={teams} />
      </SidebarFooter> */}
    </Sidebar>
  );
}
