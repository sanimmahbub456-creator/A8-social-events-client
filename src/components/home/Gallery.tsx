import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";

// Static visual story of past completed drives — no database involved, per spec
// (the Gallery section is required to stay static). 6 photos, uniform 3-column grid.
const STORY: { src: string; title: string; date: string }[] = [
  {
    src: "https://images.unsplash.com/photo-1758599668508-d8ec9eca1be3?auto=format&fit=crop&w=800&q=80",
    title: "Riverside Cleanup Drive",
    date: "Completed · Oct 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1641320201668-1b2bedb4a066?auto=format&fit=crop&w=800&q=80",
    title: "Community Tree Plantation",
    date: "Completed · Sep 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1773217509556-d64efab5f150?auto=format&fit=crop&w=800&q=80",
    title: "Winter Clothes Distribution",
    date: "Completed · Aug 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?auto=format&fit=crop&w=800&q=80",
    title: "Food Distribution Drive",
    date: "Completed · Jul 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    title: "Blanket Relief Campaign",
    date: "Completed · Jun 2026",
  },
  {
    src: "https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?auto=format&fit=crop&w=800&q=80",
    title: "Community Education Workshop",
    date: "Completed · May 2026",
  },
];

export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-20">
      <h2 className="section-heading">Moments from our community</h2>
      <p className="section-subheading">
        A visual story of past drives our volunteers have completed together.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {STORY.map((item) => (
          <div
            key={item.title}
            className="relative rounded-2xl overflow-hidden group h-40 sm:h-56 md:h-64"
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="font-heading font-semibold text-sm leading-tight line-clamp-1">
                {item.title}
              </p>
              <p className="flex items-center gap-1 text-[11px] text-white/80 mt-0.5">
                <FiCheckCircle size={11} /> {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}