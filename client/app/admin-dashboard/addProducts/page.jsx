'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddProductPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !price || !stock) {
      return toast.error('All fields are required ❌')
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('stock', stock)
      formData.append('image', image)

      const token = localStorage.getItem('adminToken')

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success('Product added successfully 🎉')
        router.push('/admin-dashboard/products')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020b18] flex items-center justify-center px-4 py-16">

      {/* background glow removed (clean version) */}
      
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white font-['Orbitron',monospace]">
            Add <span className="text-cyan-400">Product</span>
          </h1>
          <p className="text-sky-200/60 mt-3">
            Create new product for your MyShop store
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-8 space-y-5 shadow-2xl"
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-transparent border border-cyan-400/20 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-400 transition"
            required
          />

          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-4 h-32 rounded-xl bg-transparent border border-cyan-400/20 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-400 transition resize-none"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-transparent border border-cyan-400/20 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-400 transition"
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-transparent border border-cyan-400/20 text-white placeholder-sky-300/40 focus:outline-none focus:border-cyan-400 transition"
              required
            />
          </div>

          {/* File Upload */}
          <div className="border border-dashed border-cyan-400/30 rounded-xl p-5 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-sky-200/60"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold font-['Orbitron',monospace] tracking-widest bg-cyan-400 text-[#020b18] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'ADDING PRODUCT...' : 'ADD PRODUCT'}
          </button>

        </form>
      </div>
    </div>
  )
}