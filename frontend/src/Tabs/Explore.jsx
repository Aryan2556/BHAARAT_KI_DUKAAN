import React from 'react';
import CategoryItem from "../components/CategoryItem";

const categories = [
	{ href: "/Clothes", name: "Clothes", imageUrl: "/Assests/Clothes.jpg" },
	{ href: "/Footwears", name: "Footwears", imageUrl: "/Assests/Footwears.jpg" },
	{ href: "/Household", name: "Household Appliances", imageUrl: "/Assests/Household.jpg" },
	{ href: "/Kitchen", name: "Kitchen Appliances", imageUrl: "/Assests/Kitchen.jpg" },
	{ href: "/Medicines", name: "Medicines", imageUrl: "/Assests/Medicines.jpg" },
	{ href: "/Spectacles", name: "Spectacles", imageUrl: "/Assests/Spectacles.jpg" },
	{ href: "/Bags", name: "Bags", imageUrl: "/Assests/Bags.jpg" },
];
const Explore = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        
        
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
          Explore your choices ...
        </h1>
        
        <p className='text-center text-xl text-gray-300 mb-12'>
					Discover your fashion that add spark in your style ....
				</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {categories.map((category)=>(
            <CategoryItem category={category} key={category.name}/>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Explore;