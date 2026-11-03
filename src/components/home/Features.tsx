import { FiUsers, FiMapPin, FiCalendar, FiShield } from "react-icons/fi";

const features = [
  {
    icon: FiCalendar,
    title: "Organize in minutes",
    desc: "Create a clothes drive, cleanup, or plantation day with a date, location, and a few details.",
  },
  {
    icon: FiUsers,
    title: "Rally your neighbors",
    desc: "Anyone can join an event with one click and show up ready to help.",
  },
  {
    icon: FiMapPin,
    title: "Local-first discovery",
    desc: "Browse events happening in your own area, sorted by what's coming up soonest.",
  },
  {
    icon: FiShield,
    title: "You control your events",
    desc: "Only you can edit or cancel events you create — full management from one dashboard.",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-20">
      <h2 className="section-heading">Everything you need to do good, locally</h2>
      <p className="section-subheading">
        HandsTogether handles the logistics so your community can focus on showing up.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card bg-base-100 border border-base-300 shadow-sm h-full">
            <div className="card-body">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3">
                <Icon size={22} />
              </div>
              <h3 className="font-heading font-semibold text-lg">{title}</h3>
              <p className="text-sm text-base-content/70">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
