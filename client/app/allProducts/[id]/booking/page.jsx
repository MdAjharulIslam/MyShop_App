'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function OrderPage() {
  const router = useRouter()
  const { id: productId } = useParams()

  const [quantity, setQuantity] = useState(1)
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    setToken(savedToken)

    if (!savedToken) {
      toast.error('You must be logged in to place an order')
      router.push('/login')
    }
  }, [])

  const handleOrder = async (e) => {
    e.preventDefault()

    if (!quantity || quantity <= 0 || !phone) {
      return toast.error('Please enter quantity and phone number')
    }

    if (!token) return

    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/add/${productId}`,
        { quantity, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        toast.success('Order placed successfully!')
        router.push('/myorders')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020b18] flex items-center justify-center px-4 font-['DM_Sans',sans-serif]">

      <div className="w-full max-w-md bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-6">

        <h1 className="text-2xl font-['Orbitron',monospace] font-bold text-white text-center mb-6">
          Place Your Order
        </h1>

        <form onSubmit={handleOrder} className="space-y-5">

          
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="w-full px-3 py-2 bg-[#111827] border border-cyan-400/10 rounded-lg text-white outline-none focus:border-cyan-400/40"
              required
            />
          </div>

        
          <div>
            <label className="block mb-1 text-sm text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 bg-[#111827] border border-cyan-400/10 rounded-lg text-white outline-none focus:border-cyan-400/40"
              required
            />
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-[#020b18] py-2.5 rounded-xl font-bold font-['Orbitron',monospace] text-sm tracking-widest hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'PLACING ORDER...' : 'PLACE ORDER'}
          </button>

        </form>

      </div>
    </div>
  )
}