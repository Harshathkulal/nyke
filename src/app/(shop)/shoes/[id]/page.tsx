"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "@/lib/redux/cartSlice";
import { sizes } from "@/data/size";
import Image from "next/image";
import { toast } from "sonner";
import { Product } from "@/types/products";
import { DetailLoading } from "@/components/products/detail-loading";
import NoProductFound from "@/components/products/no-product";

export default function ShoeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeSelected, setIsSizeSelected] = useState<boolean>(false);

  // function to fetch product details by ID
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<Product>(`/api/products`, {
          params: { id: id.toString() },
        });

        if (!data || !data.id) {
          throw new Error("Product not found");
        }

        setProduct(data);
      } catch (error: unknown) {
        console.error("Error fetching product:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // function to handle size selection
  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
    setIsSizeSelected(false);
  };

  // function to Add to cart
  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      setIsSizeSelected(true);
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      imageSrc: product.imageSrc || product.imageUrl,
      feature: product.feature,
      price: parseFloat(product.price),
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(cartItem));
    toast("Product added to cart!");
  };

  if (loading) return <DetailLoading />;
  if (error) return <NoProductFound />;
  if (!product) return <NoProductFound />;

  return (
    <div className="flex mt-10 lg:p-5 justify-between lg:justify-around m-4 flex-wrap lg:px-24">
      <div className="lg:hidden">
        <p className="text-2xl font-medium">{product.name}</p>
        <p className="font-medium">{product.gender}s Shoes</p>
        <p className="mt-3 font-semibold text-lg">MRP: ₹{product.price}</p>
        <p className="text-gray-500 font-medium">incl. of taxes</p>
        <p className="text-gray-500 font-medium">
          (Also includes all applicable duties)
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="lg:flex flex-col gap-2 hidden">
          {[...Array(4)].map((_, i) => (
            <Image
              key={i}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg"
              src={product.imageSrc || product.imageUrl || ""}
              alt={product.imageUrl || "Product thumbnail"}
            />
          ))}
        </div>
        <div>
          <Image
            width={300}
            height={300}
            className="size-96 rounded-lg"
            src={product.imageSrc || product.imageUrl || ""}
            alt={product.imageUrl || "Product image"}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="hidden lg:block">
          <p className="text-2xl">{product.name}</p>
          <p className="font-medium">{product.gender}s Shoes</p>
          <p className="mt-3 font-semibold text-lg">MRP: ₹{product.price}</p>
          <p className="text-gray-500 font-medium">incl. of taxes</p>
          <p className="text-gray-500 font-medium">
            (Also includes all applicable duties)
          </p>
        </div>

        <div className="lg:mt-20 mt-8">
          <div className="flex justify-between mx-4">
            <h3 className="text-lg font-semibold mb-2">Select Size</h3>
            <h3 className="text-lg font-semibold mb-2 text-gray-500">
              Size Guide
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSelectSize(size)}
                className={`border rounded-md px-6 p-2 ${
                  selectedSize === size ? "border-2 border-black" : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {isSizeSelected && !selectedSize && (
            <p className="text-red-600 mt-2">Please select a size.</p>
          )}
        </div>

        <div className="my-10 flex flex-col gap-3">
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-black text-white font-medium px-28 p-3 py-4 text-lg"
          >
            Add to Bag
          </button>
          <button className="rounded-full text-black border border-black font-medium px-28 p-3 py-4 text-lg">
            Favourite
          </button>
        </div>
      </div>
    </div>
  );
}
