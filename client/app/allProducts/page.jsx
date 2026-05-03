'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from "next/link"
import ProductCard from '../../components/ProductCard'

export default function AllProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/all`
        )
        setProducts(response.data.products || [])
      } catch (err) {
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-gray-400">
        Loading products...
      </div>
    )
  }

 
  if (error) {
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-red-400">
        {error}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#020b18] px-6 py-12 text-white font-['DM_Sans',sans-serif]">

      <div className="max-w-7xl mx-auto">

        
        <div className="text-center mb-12">

          <h1 className="text-3xl md:text-5xl font-['Orbitron',monospace] font-bold">
            All <span className="text-cyan-400">Products</span>
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            Explore our full collection of premium products crafted for quality and performance.
          </p>

        </div>

        
        {products.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No products found.
          </div>
        ) : (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <Link
                key={product._id}
                href={`/allProducts/${product._id}`}
                className="block"
              >
                <ProductCard product={product} />
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  )
}