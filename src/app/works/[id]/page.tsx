import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORKS, getWorkById } from "@/data/works";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import WorkDetail from "@/components/Works/WorkDetail";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return WORKS.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) return {};
  return {
    title: `${work.productName} — ${work.title}`,
    description: work.description.slice(0, 160),
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const work = getWorkById(id);
  if (!work) notFound();

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <WorkDetail work={work} />
      </main>
      <Footer />
    </>
  );
}
