import SortBar from "@/components/SortBar";
import AnimalCards from "@/components/AnimalCards";

const AllAnimalsPage = async ({ searchParams }) => {
  const params = await searchParams;

  const category = params?.category || "";
  const sort = params?.sort || "";

  const res = await fetch(
    "https://assignment-08-flame.vercel.app/data.json",
    { cache: "no-store" }
  );

  let animals = await res.json();


  if (category) {
    animals = animals.filter(
      (a) => a.category.toLowerCase() === category.toLowerCase()
    );
  }

 
  if (sort === "low") {
    animals.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === "high") {
    animals.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">

      
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold">
            All <span className="text-emerald-500">Animals</span>
            <p className="text-gray-400 mt-2 text-lg">
              আপনার বাজেট অনুযায়ী সেরা পশুটি খুঁজে নিন
            </p>
          </h1>
          <span><SortBar currentSort={sort} category={category} /></span>
          
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          <AnimalCards animals={animals} />
        </div>
      </div>
    </div>
  );
};

export default AllAnimalsPage;