import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import RecentEvents from "@/components/home/RecentEvents";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Features />
      <RecentEvents />
      <Gallery />
      <Newsletter />
    </>
  );
}
