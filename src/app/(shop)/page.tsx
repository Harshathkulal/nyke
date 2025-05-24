"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center m-2 gap-2 text-center">
        <p className="font-medium">Lifestyle Running Shoes</p>
        <h1 className="text-5xl font-extrabold">EXTRA-ORDINARY</h1>
        <p className="font-medium text-gray-800 mt-6">
          Meet the latest collection of retro running inspired shoes. The
          unlikely heroes of your easiest styling hack.
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            href="/shoes"
            className="rounded-full bg-black text-white font-medium px-4 py-1.5 hover:bg-gray-700"
          >
            Buy It
          </Link>
          <Link
            href="/shoes"
            className="rounded-full bg-black text-white font-medium px-4 py-1.5 hover:bg-gray-700"
          >
            Style It
          </Link>
        </div>
      </section>

      {/* Shoe Gallery Section */}
      <section className="flex justify-center mt-6">
        <div className="flex overflow-x-auto gap-4 px-4">
          {[
            { slug: "dunk", img: "023cd51d-143f-4242-8845-4f52eaa89cc6" },
            { slug: "airforce", img: "73c4a613-c354-4bd5-9df8-e0cc7705c467" },
            { slug: "Jorden-1", img: "2d16fd38-f931-4ea7-8e9f-e39322c50186" },
            { slug: "Blazer", img: "618f306d-5c1a-4b42-8b0a-77650c1928de" },
          ].map(({ slug, img }, idx) => (
            <Link
              key={idx}
              href={`/shoes/?type=${slug}`}
              className="flex-none inline-block"
            >
              <Image
                width={300}
                height={300}
                src={`https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_598,c_limit/${img}/nike-just-do-it.jpg`}
                alt={`Image ${idx + 1}`}
                className="w-72 h-72 object-cover rounded-lg"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* Air Max Section */}
      <section className="flex flex-col items-center m-4 gap-2 text-center">
        <p className="font-medium">Just In</p>
        <h1 className="text-5xl font-extrabold">AIR MAX ON</h1>
        <p className="font-medium text-gray-800 mt-6">
          Step into the unreal Worlds of Sneakers.
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            href="/shoes"
            className="rounded-full bg-black text-white font-medium px-4 py-1.5 hover:bg-gray-700"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
