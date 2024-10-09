import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, Package, BookOpen, HandCoins, OptionIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["Clothes", "Bags", "Footwears", "Household Appliances", "Kitchen Appliances", "Medicines", "Spectacles"];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

  const { loading , createProduct } = useProductStore();
  
	const handleSubmit = async (e) => {
		e.preventDefault();

    try {
      await createProduct(newProduct);
      setNewProduct({ name:"", description:"", price:"", category:"", image:"" });
    } catch (error) {
      console.log("error in creating a product..")
    }
	};

	const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file){
      const reader = new FileReader();
      reader.onloadend = () =>{
        setNewProduct({ ...newProduct, image: reader.result });
      }
      reader.readAsDataURL(file);
    }
	};

	return (
		<motion.div className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} >
			<h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Product Name
					</label>

          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Package className="h-5 w-5 text-gray-400" aria-hidden = 'true' />
            </div>
            <input type='text' id='name' name='name' value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className='mt-1 block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' required />
          </div>

				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
          		<div>
					<div className='mt-1 relative rounded-md shadow-sm'>
						<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
							<BookOpen className='h-5 w-5 text-gray-400' aria-hidden='true' />
						</div>
						<textarea id='description' name='description' value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows='3' className='mt-1 block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' required />
					</div>
				</div>
        </div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price
					</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
					  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <HandCoins className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <input type='number' id='price' name='price' value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} step='0.01'className='mt-1 block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' required />
          </div>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-gray-300'>
						Category
					</label>
          <div className='mt-1 relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <OptionIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </div>
            <select id='category' name='category' value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className='mt-1 block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm' required >
              <option value=''>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

				</div>

				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>
					{newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded successfully ... </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Creating...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};
export default CreateProductForm;