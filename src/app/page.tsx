import { Hero } from "@/components/Hero";
import { NavigationCards } from "@/components/NavigationCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Hero />
      <NavigationCards />
    </main>
  );
}
