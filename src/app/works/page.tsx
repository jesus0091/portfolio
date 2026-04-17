import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import WorksHero from "@/components/Works/WorksHero";
import WorksList from "@/components/Works/WorksList";

export const metadata: Metadata = {
  title: "Works",
  description: "All projects by Jesús Hernández — frontend development, UX/UI design, and full-stack digital products.",
};

export default function WorksPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <WorksHero />
        <WorksList />
      </main>
      <Footer />
    </>
  );
}
