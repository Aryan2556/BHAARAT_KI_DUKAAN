import { Product } from '../models/index.js';

export const CartProducts = async(req,res) =>{
  try {
    const products = await Product.find({_id:{$in:req.user.cartItem}});
    const cartItems = products.map(product =>{
      const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
      return{...product.toJSON(),quantity:item.quantity}
    })

    res.json(cartItems);
  } catch (error) {
    console.log("Error in CartProducts controller",error.message);
    res.status(500).json({ message: "Server Error",error:error.message });
  }
};

export const addInCart = async(req,res) =>{  
  try {
    const {productid} = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(item => item.id === productid);
  
    if (existingItem){
        existingItem.quantity +=1;
    }else{
        user.cartItems.push(productid)
    }
  
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in addInCart controller", error.message);
    res.status(500).json({ message: "Server Error",error:error.message });
  }  
};

export const removeFromAllCart = async(req,res) =>{
  try {
    const { productid } = req.body;
    const user = req.user;
    if ( !productid ){
      user.cartItems = [];
    }else{
      user.cartItems = user.cartItems.filter((item) => item.id !== productid);
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.log("Error in removeFromallCart", error.message);
    res.status(500).json({ message: "Server error", error:error.message });
  }
};

export const UpdateQunatity = async(req,res) =>{
  try {
    const { id:productid } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === productid);

    if(existingItem){
      if(quantity===0){
        user.cartItems = user.cartItems.filter((item) => item.id !== productid);
        await user.save();
        return res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      await user.save();
      res.json(user.cartItems);
    }else{
      res.status(404).json({ message : "Product not found "});
    }
  } catch (error) {
    console.log("Error in updateQunatity part",error.message);
  }
};