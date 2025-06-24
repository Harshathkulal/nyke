"use client";

import { MdConstruction } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  return (
    <div className="flex justify-center items-center m-8 py-20 flex-col gap-4">
      <p className="text-xl font-bold">Under Construction</p>
      <MdConstruction size={48} />

      <div className="stripe-payment-container">
        <p className="text-lg font-semibold">Checkout with Stripe</p>
        <button className="btn-stripe">
          Pay with Google Pay (Temporarily)
        </button>
      </div>

      <Link href="/">
        <Button>Back</Button>
      </Link>
    </div>
  );
};

export default Checkout;
