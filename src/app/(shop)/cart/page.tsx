"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { removeFromCart, selectCartItems } from "@/lib/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaCircleInfo, FaArrowRight } from "react-icons/fa6";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTax = 0;
  const orderTotal = subtotal + estimatedTax;

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-wrap m-2 mt-8 justify-center gap-10">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Bag</h1>
        {cartItems.length === 0 ? (
          <div className="mr-10">
            <p className="text-gray-500">There are no items in your bag.</p>
            <Link href="/shoes/" className="text-xs flex items-center mt-4 font-medium">
              Continue Shopping <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div className="flex mt-4 flex-col divide-y divide-gray-300">
            {cartItems.map((item) => (
              <div key={item.id} className="flex mt-4 pt-4">
                <div>
                  <Image
                    src={item.imageSrc || "/placeholder.jpg"}
                    alt={item.name}
                    width={144}
                    height={144}
                    className="h-36 w-36 object-cover"
                  />
                </div>

                <div className="ml-4">
                  <div className="flex lg:gap-14 flex-col-reverse lg:flex-row font-semibold">
                    <h3>{item.name}</h3>
                    <p className="gap-2">MRP: ₹{item.price}</p>
                  </div>

                  <p className="font-medium text-gray-500">{item.feature}</p>
                  <p className="font-medium text-gray-500 mt-2">Size: {item.size}</p>
                  <p className="font-medium text-gray-500 mt-2">
                    Quantity: {item.quantity}
                  </p>

                  <div className="flex gap-4 lg:pr-96 mt-8">
                    <button>
                      <IoMdHeartEmpty size={22} />
                    </button>
                    <button onClick={() => handleRemove(item.id)}>
                      <RiDeleteBin6Line size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">Summary</h1>

        <div className="flex justify-between font-medium text-lg">
          <div className="flex gap-2 items-center">
            Subtotal <FaCircleInfo size={12} className="cursor-pointer" />
          </div>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between font-medium mb-4 text-lg">
          <p>Estimated Delivery & Handling</p>
          <span>₹Free</span>
        </div>

        <div className="border-t border-slate-300" />

        <div className="flex justify-between font-medium text-lg">
          <p>Total</p>
          <span>₹{orderTotal}</span>
        </div>

        <div className="border-t border-slate-300" />

        <div className="flex flex-col gap-4 mt-10 mb-4">
          <Link
            href="/checkout"
            className="rounded-full bg-black text-white font-medium px-24 p-3 text-lg text-center"
          >
            Go to Checkout
          </Link>
          <Link
            href="/checkout"
            className="rounded-full bg-black text-white font-medium px-24 p-3 text-lg hidden lg:block text-center"
          >
            Member Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
