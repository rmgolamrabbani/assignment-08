import Category from "@/components/Category";
import AnimalCards from "@/components/AnimalCards";

const AllAnimalsPage = async ({ searchParams }) => {
  const category = searchParams?.category;

  const res = await fetch(
    "https://assignment-08-flame.vercel.app/data.json",
    { cache: "no-store" }
  );

  const animals = await res.json();

  const filteredAnimals = category
    ? animals.filter(
        (animal) =>
          animal.category.toLowerCase() === category.toLowerCase()
      )
    : animals;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">All Animals</h1>

      <Category />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <AnimalCards animals={filteredAnimals} />
      </div>
    </div>
  );
};

export default AllAnimalsPage;