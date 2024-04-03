import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { RegisterView } from "@/components/Register";
import Image from "next/image";

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:text-white/90 text-white/85">
      <Navbar />
      <RegisterView />
    </main>
  );
}