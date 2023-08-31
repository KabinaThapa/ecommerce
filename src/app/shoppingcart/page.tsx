'use client'
import { decrement, increment, removefromcart } from '@/redux/features/cartslice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {loadStripe} from '@stripe/stripe-js'
import {AiOutlineDelete} from 'react-icons/ai'

const stripePromise=()=>loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const page = () => {
  const items=useSelector((state:RootState)=>state.cart.data)
  const {cartQuantity}=useSelector((state:RootState)=>state.cart)
  const {cartAmount}=useSelector((state:RootState)=>state.cart)
  
  const dispatch=useDispatch()
  const handleIncrement=(id:number)=>{
    dispatch(increment(id))

  }
  const handleDecrement=(id:number)=>{
    dispatch(decrement(id))

  }
  const handleDelete=(id:number)=>{
    dispatch(removefromcart(id))

  }
  const handleCheckout = async () => {
    const stripe = await stripePromise();
    console.log(items)
    const { error } = await stripe.redirectToCheckout({
      lineItems: items.map(product=>({price:product.priceId.toString() , quantity:product.quantity})),
      mode: 'payment',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  };
    
  
  return (
    <>
    {/* <PaymentElement/> */}
    <div className='flex flex-col w-[70%] mx-auto  m-12'>
      <div className='text-3xl w-full justify-between items-center flex'>
        <p>Your Cart</p> <p>Total: {cartQuantity}Items</p> 
        </div>
       <table className="w-full mx-auto text-left text-xl  mt-6 bg-white">
                <thead>
                  <tr className=" font-serif border-b-2 p-2 shadow-md ">
                    
                    <th className="px-4 py-4">Item</th>
                    <th className="px-4 py-4">Quantity</th>
                    <th className="px-4 py-4">Price</th>
                    <th className="px-4 py-4">Total</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className=" pb-4 border-b-2 shadow-md">
                      <td className=" px-4 py-8 ">
                        <img
                          src={item.image}
                          width="200px"
                          
                          alt={item.name}
                        />
                        <p>{item.name}</p>
                      </td>
                    
                      <td className=" px-4 py-8">
                        <div className="border-2 bg-Antiflashwhite rounded-md flex  w-44 justify-around p-1 text-2xl font-serif">
                          <button onClick={() => handleIncrement(item.id)}>
                            +
                          </button>
                          <p>{item.quantity}</p>
                          <button onClick={() => handleDecrement(item.id)}>
                            -
                          </button>
                        </div>
                      </td>
                      <td className=" px-4 py-8 font-serif"> $ {item.price}</td>
                      <td className=" px-4 py-8 font-serif">
                        $ {item.price * item.quantity}
                      </td>
                      <td className=" px-4 py-8">
                        <button onClick={() => handleDelete(item.id)}>
                          <AiOutlineDelete size={25}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='ms-auto'>
     
      <h1 className='text-2xl'>SubTotal:{cartAmount}</h1>
      <button onClick={handleCheckout} className='border-2 p-4 rounded-md bg-slate-400'>
        Checkout</button>
        </div>
    </div>
    </>
  )

}

export default page