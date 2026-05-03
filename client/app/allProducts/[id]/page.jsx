'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
        );
        setProduct(res.data.product);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-gray-400">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-gray-400">
        Product not found
      </div>
    );

  return (
    <main className="min-h-screen bg-[#020b18] text-white py-12 px-4 font-['DM_Sans',sans-serif]">

      <div className="max-w-6xl mx-auto">

        
        <Link
          href="/allProducts"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-10 transition"
        >
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

       
          <div className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl overflow-hidden">
            <img
              src={product.image || "https://via.placeholder.com/600"}
              alt={product.name}
              className="w-full h-[420px] object-cover"
            />
          </div>

         
          <div className="space-y-6">

           
            <span className="inline-block px-3 py-1 text-[11px] tracking-widest uppercase border border-cyan-400/20 text-cyan-400 rounded">
              {product.category || "General"}
            </span>

            <h1 className="text-3xl lg:text-5xl font-['Orbitron',monospace] font-bold">
              {product.name}
            </h1>

           
            <p className="text-4xl font-bold text-cyan-400 font-['Orbitron',monospace]">
              ${product.price}
            </p>

            
            <p className={`text-sm ${
              product.stock > 0 ? "text-emerald-400" : "text-red-400"
            }`}>
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </p>

           
            <p className="text-gray-400 leading-relaxed">
              {product.description || "No description available."}
            </p>

         
            <div className="flex gap-4 pt-4">

              <Link
                href={`/allProducts/${id}/booking`}
                className={`flex-1 text-center py-3 rounded-xl font-bold transition ${
                  product.stock > 0
                    ? "bg-cyan-400 text-[#020b18] hover:bg-cyan-300"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </Link>

              <Link
                href={`/allProducts/${id}/booking`}
                className="flex-1 text-center py-3 rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 transition"
              >
                Buy Now
              </Link>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}