import React from 'react';
import AnimalCards from './AnimalCards';



const FeaturedAnimals = async () => {

    const res = await fetch('https://assignment-08-flame.vercel.app/data.json');
    const animal = await res.json();
    const topAnimals = animal.slice(0, 3);


    return (
        <div>
            <h2>Featured Animals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topAnimals.map((animal) => <AnimalCards key={animal.id} animals={topAnimals} />)}
            </div>
        </div>
    );
}

export default FeaturedAnimals;


