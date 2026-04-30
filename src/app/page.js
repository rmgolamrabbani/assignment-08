import Image from "next/image";
import Hero from "../components/Hero";
import FeaturedAnimals from "../components/FeaturedAnimals";
import Tips from "../components/Tips";


export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedAnimals />
      <Tips />
    </div>
  );
}
