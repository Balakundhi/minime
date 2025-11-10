import { Hero } from "@/components/Hero";
import { NavigationCards } from "@/components/NavigationCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <NavigationCards />
    </main>
  );
}
