'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import ProductCard from './ProductCard'

export default function LatestProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/latest-product`
        )

        if (res.data.success) {
          setProducts(res.data.latestProducts)
        }
      } catch (error) {
        toast.error('Failed to fetch latest products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <section className="relative w-full py-24 bg-[#020b18] overflow-hidden rounded-3xl">
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Loading Latest Products
          </h2>
          <p className="text-cyan-200/80 text-lg">
            Scanning the newest arrivals for you...
          </p>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="relative w-full py-24 bg-[#020b18] overflow-hidden rounded-3xl">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-5xl">
            🆕
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            No New Products Yet
          </h2>
          <p className="text-cyan-200/70 text-xl max-w-xl mx-auto">
            Fresh arrivals are on the way. Check back soon for the latest innovations.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full py-24 bg-[#020b18] overflow-hidden rounded-3xl">

      

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded bg-cyan-400/8 border border-cyan-400/30 font-['Orbitron',monospace] text-[10px] tracking-[2.5px] text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            JUST ARRIVED
          </div>

          <h2
            className="mb-6 leading-none font-['Orbitron',monospace] font-black text-white"
            style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}
          >
            Latest <span className="text-cyan-400">Products</span>
          </h2>

          <p
            className="max-w-3xl mx-auto font-light tracking-wide text-sky-200/75 leading-relaxed"
            style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}
          >
            Discover cutting-edge arrivals, handpicked to bring you the newest trends,
            best performance, and unbeatable value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {products.slice(0, 8).map((product, index) => (
            <Link
              key={product._id || index}
              href={`/allProducts/${product._id}`}
              className="group block transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative rounded-3xl border border-cyan-400/15 bg-white/5 backdrop-blur-xl p-1 hover:border-cyan-400/40 transition-all duration-300">
                <ProductCard
                  product={product}
                  rank={index + 1}
                  isNewArrival={true}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/allProducts">
            <button className="inline-flex items-center gap-3 px-10 py-5 font-['Orbitron',monospace] rounded-2xl bg-cyan-400 text-[#020b18] font-bold text-lg hover:-translate-y-1 transition-all duration-300">
              View All Products
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}