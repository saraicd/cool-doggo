"use client";
import { ReactNode } from "react";
import Navbar from "../NavBar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto scrollable-content">
        {children}
      </main>
    </div>
  );
}
