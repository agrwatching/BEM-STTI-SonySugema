import "@/app/globals.css";
import { Metadata } from "next";
import AdminLayoutClient from "./AdminLayoutClient";

export const metadata: Metadata = {
  title: "Dashboard Admin | Senat STTI Sony Sugema",
  description: "Panel admin untuk mengelola website Senat STTI Sony Sugema",
  icons: {
    icon: "/logo_senat.ico",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
