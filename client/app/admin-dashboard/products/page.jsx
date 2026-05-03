'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AdminProductsPage() {
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  })

  const fetchProducts = async (authToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      if (res.data.success) {
        setProducts(res.data.products)
      }
    } catch (err) {
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')

    if (!savedToken) {
      toast.error('Admin login required')
      router.push('/admin-login')
      return
    }

    setToken(savedToken)
    fetchProducts(savedToken)
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      toast.success('Product deleted')

      setProducts(prev => prev.filter(p => p._id !== id))
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleEditClick = (product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    })
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${selectedProduct._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.success) {
        toast.success('Product updated')

        setProducts(prev =>
          prev.map(p =>
            p._id === selectedProduct._id ? res.data.product : p
          )
        )

        setSelectedProduct(null)
      }
    } catch {
      toast.error('Update failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center">
        <div className="text-sky-200/70">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020b18] px-6 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-black font-['Orbitron',monospace] text-white">
          Product <span className="text-cyan-400">Management</span>
        </h1>
        <p className="text-sky-200/60 mt-3">
          Manage all products in your store
        </p>
      </div>

      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {products.map(product => (
          <div
            key={product._id}
            className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] transition-all duration-300"
          >

            <h2 className="text-xl font-bold text-white mb-3 font-['Orbitron',monospace] truncate">
              {product.name}
            </h2>

            <p className="text-sky-200/60 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <p className="text-cyan-400 font-bold text-lg">
              ${product.price}
            </p>

            <p className="text-sm text-sky-200/70 mt-2">
              Stock:{' '}
              <span className={product.stock > 0 ? "text-green-400" : "text-red-400"}>
                {product.stock}
              </span>
            </p>

           
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => handleEditClick(product)}
                className="flex-1 py-2 rounded-xl bg-yellow-400 text-black font-bold hover:scale-105 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white font-bold hover:scale-105 transition"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

      
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="w-full max-w-md bg-[#020b18] border border-cyan-400/20 rounded-3xl p-6">

            <h2 className="text-xl font-bold text-cyan-400 mb-4 font-['Orbitron',monospace]">
              Update Product
            </h2>

            <input
              className="w-full mb-3 px-4 py-3 rounded-xl bg-transparent border border-cyan-400/20 text-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="number"
              className="w-full mb-3 px-4 py-3 rounded-xl bg-transparent border border-cyan-400/20 text-white"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <input
              type="number"
              className="w-full mb-3 px-4 py-3 rounded-xl bg-transparent border border-cyan-400/20 text-white"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            />

            <textarea
              className="w-full mb-4 px-4 py-3 rounded-xl bg-transparent border border-cyan-400/20 text-white"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex gap-3">

              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 py-2 rounded-xl bg-gray-600 text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="flex-1 py-2 rounded-xl bg-cyan-400 text-black font-bold"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}