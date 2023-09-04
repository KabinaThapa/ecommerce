'use client'
import React, {useEffect,useState} from 'react'
import { RootState, AppDispatch } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchProduct, Product } from '@/redux/features/productslice';
import { addtocart } from '@/redux/features/cartslice';
import { addtowishlist, removefromwishlist } from '@/redux/features/wishlistslice';
import Card from '@/components/card/card'
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import { Items } from '@/redux/types/items';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"



export default function Page({ params }: { params: { category: string, subcategory: string } }) {
    const dispatch=useDispatch<AppDispatch>()
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
    const [sortByPrice, setSortByPrice] = useState<boolean>(false)
    useEffect(()=>{
      dispatch(fetchProduct())
    },[])
    const{item}=useSelector((state:RootState)=>state.product)
    console.log(item)
    console.log(params)
    useEffect(() => {
      const filterCategory = item.filter(
        (product) => product.category === params.category && product.subcategory === params.subcategory
      )
      console.log(filterCategory)
  
      let productsToShow = filterCategory;
  
      if (sortByPrice) {
        productsToShow = [...filterCategory].sort((a, b) => a.price - b.price);
      }
  
      setSortedProducts(productsToShow);
    }, [item, params.category, params.subcategory, sortByPrice]);
   
    
    
    const items=useSelector((state:RootState)=>state.wishlist.item)
    

    //addtocart functionality
    
    const handleAddtocart=(product:Items)=>{
      dispatch(addtocart(product))
      toast.success(`${product.name} added to cart!`)

    }
    //addtowishlist functionality
    const handleSave=(product:Items)=>{
      if(items.find((item)=>item.id===product.id)){
        dispatch(removefromwishlist(product.id))
        toast.success(`${product.name} removed from wishlist!`)
      }
      else{
        dispatch(addtowishlist(product))
        toast.success(`${product.name} added to wishlist!`)
      }
    }
    const handleSortByPrice = () => {
      setSortByPrice(!sortByPrice);
    }
    return(
     <>
     <div className='flex flex-col items-center justify-center w-full p-[5%] gap-10 '>
      <div className='w-[90%] text-2xl flex justify-between'>
      <h1 className='text-4xl underline'>{params.subcategory}s</h1>
      <select id='filter' onChange={handleSortByPrice} value='Filter'>
          <option value=''>Filter</option>
          <option value='price'>Price</option>
        </select>
      </div>
   
 
    <div className=' grid grid-cols-4 gap-4  w-[90%]' > 

    {sortedProducts.map((product)=>(
        <div className=''>
          {sortedProducts.length===0 ? (<Skeleton width={300} height={400}/>):(
       
        <Card
      img={product.image}
      title={product.name}
      price={product.price}
      addtocart={()=>handleAddtocart(product)}
      savetowishlist={()=>handleSave(product)}
      heartfill={items.find((item)=>item.id===product.id)}
      href={`/product/${params.category}/${params.subcategory}/${product.id}`}
      />
      )}
        </div>
    ))}
    
    
    </div>
    </div>
    </>
    )
  }