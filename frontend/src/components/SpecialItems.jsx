import React,{ useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProductCard from '../components/FeaturedProductCard';

const SpecialItems = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();
    
    useEffect(()=>{
        fetchFeaturedProducts(); 
       },[fetchFeaturedProducts]);

  return (
    <div>
        {!isLoading && products.length > 0 && <FeaturedProductCard featureProducts={products} />}
    </div>
  );
};

export default SpecialItems;