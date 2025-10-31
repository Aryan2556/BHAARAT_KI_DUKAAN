import React,{useState, useEffect} from 'react';
import toast from 'react-hot-toast';

import axios from '../lib/axios';
import Loadingg from './Loadingg';
import ProductCard from './ProductCard';

const PeopleBought = () => {

  const [recommendations, setRecommendations] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const Recommendations = async() =>{
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred while fetching recommendations");
      }finally{
        setIsLoading(false);
      }
    };

    Recommendations();
  },[]);

  if (isLoading) return <Loadingg />;

  return (
    <div className='mt-8'>
      <h3 className='text-2xl font-semibold text-emerald-400'>People also liked</h3>
      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3'>
        {recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
      </div>
    </div>
  );
};

export default PeopleBought;