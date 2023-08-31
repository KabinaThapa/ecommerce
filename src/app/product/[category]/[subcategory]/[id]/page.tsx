'use client'
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Stars from '@/components/stars'


const ProductDetail = ({params}:{ params:{id: string}}) => {
    
    const products = useSelector((state: RootState) => state.product.item);
    console.log(products)
console.log(params)
const productId = parseInt(params.id, 10)
    const product = products.find((product) => product.id === productId); // Find the product with the matching id
console.log(product)
    if (!product) {
        return <div>Loading...</div>;
    }
    const rating = product.rating
    

    return (
        <div className='w-full h-auto flex justify-around items-center p-[5%] font-opensans'>
            <div className='w-[40%] h-[40rem] overflow-hidden '>
            
            <img className='object-cover w-full h-full transition transform-transition hover:scale-150 duration-50' src={product.image} alt={product.name} />
            </div>
            <div className='w-[50%]  h-auto p-4 grid gap-4 '>
            <h2 className='text-2xl font-semibold'>{product.name}</h2>
           
             <div className='flex items-center'>
          <Stars rating={product.rating}/>
        </div>
            <p>{product.description}</p>
            <p> ${product.price}</p>
            <div className='flex flex-col items-center text-lg overflow-hidden'>
            <button className='w-full bg-wenge rounded p-2 hover:text-xl  text-white'>Add to cart</button>
            <h1>Or</h1>
            <button className='w-full bg-wenge rounded  p-2 hover:text-xl text-white'>Add to wishlist</button>
            </div>
            

            
            
            </div>
           
        </div>
    );
};

export default ProductDetail;
