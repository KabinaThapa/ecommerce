'use client'
import React, {useEffect} from 'react'
import { RootState, AppDispatch } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchProduct } from '@/redux/features/productslice';
import { Item, addtocart } from '@/redux/features/cartslice';
import { Items, addtowishlist, removefromwishlist } from '@/redux/features/wishlistslice';
import Card from '@/components/card'
import Link from 'next/link';





export default function Page({ params }: { params: { category: string, subcategory: string } }) {
    const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(fetchProduct())
    },[])
    const{item}=useSelector((state:RootState)=>state.product)
    console.log(item)
    console.log(params)
    const filterCategory=item.filter((product)=>product.category === params.category && product.subcategory===params.subcategory)
    console.log(filterCategory)
    const items=useSelector((state:RootState)=>state.wishlist.item)

    //addtocart functionality
    
    const handleAddtocart=(product:Item)=>{
      dispatch(addtocart(product))

    }
    //addtowishlist functionality
    const handleSave=(product:Items)=>{
      if(items.find((item)=>item.id===product.id)){
        dispatch(removefromwishlist(product.id))
      }
      else{
        dispatch(addtowishlist(product))
      }
    }
    return(
     <>
     <div className='flex flex-col items-center justify-center w-full p-[5%] gap-10 '>
    <h1 className='text-4xl underline'>{params.subcategory}</h1>
    <div className=' grid grid-cols-4 gap-4  w-[90%]' > 
    {filterCategory.map((product)=>(
        <div className=''>
          
       <Link href={`/product/${params.category}/${params.subcategory}/${product.id}`}>
        <Card
      img={product.image}
      title={product.name}
      price={product.price}
      addtocart={()=>handleAddtocart(product)}
      savetowishlist={()=>handleSave(product)}
      heartfill={items.find((item)=>item.id===product.id)}
      />
       </Link>
        </div>
    ))}
    
    
    </div>
    </div>
    </>
    )
  }