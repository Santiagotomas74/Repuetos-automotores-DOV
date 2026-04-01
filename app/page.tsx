
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import Models from "./components/Models";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
      <FeaturedProducts/>
      <Models/>
    </div>
  );
}
