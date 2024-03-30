import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { SalesView } from "@/components/Sales";
import Image from "next/image";

export default function Sale() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:text-white/90 text-white/85">
      <Navbar />
      <SalesView />
    </main>
  );
}
