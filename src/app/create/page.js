import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { CreateView } from "@/components/Create";

export default function Create() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:text-white/90 text-white/85">
      <Navbar />
      <CreateView />
    </main>
  );
}
