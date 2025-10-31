import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import Home from "./Tabs/Home";
import Sign from "./Tabs/Sign";
import Login from "./Tabs/Login";
import Admin from "./Tabs/Admin";
import Category from "./Tabs/Category";
import Cart from "./Tabs/Cart";
import PurchaseDone from "./Tabs/PurchaseDone";
import PurchaseNotDone from "./Tabs/PurchaseNotDone";
import Explored from "./Tabs/Explore";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

import Navbar from "./components/Navbar";
import Loadingg from "./components/Loadingg";
import Contact from "./components/Contact";
import SpecialItems from "./components/SpecialItems";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <Loadingg />;

	return (
		<div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/signup' element={!user ? <Sign /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
					<Route path='/Categories' element={<Explored />} />
					<Route path='/special' element={<SpecialItems />} />
					<Route path='/contact' element={<Contact />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <Admin /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<Category />} />
					<Route path='/cart' element={user ? <Cart /> : <Navigate to='/login' />} />
					<Route
						path='/purchase-success'
						element={user ? <PurchaseDone /> : <Navigate to='/login' />}
					/>
					<Route path='/purchase-cancel' element={user ? <PurchaseNotDone /> : <Navigate to='/login' />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;



