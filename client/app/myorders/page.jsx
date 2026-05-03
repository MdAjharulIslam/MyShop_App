'use client'

import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async (savedToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${savedToken}`
          }
        }
      )

      if (res.data.success) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const savedToken = localStorage.getItem('token')

    if (!savedToken) {
      toast.error('You must be logged in')
      setLoading(false)
      return
    }

    fetchOrders(savedToken)
  }, [fetchOrders])

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center text-gray-400">
        Loading your orders...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020b18] px-6 py-12 text-white font-['DM_Sans',sans-serif]">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-['Orbitron',monospace] font-bold text-center mb-10">
          My <span className="text-cyan-400">Orders</span>
        </h1>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl text-white mb-2">No Orders Yet</h2>
            <p>Start shopping to see your orders here.</p>
          </div>
        ) : (
          /* Orders grid */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {orders.map(order => (
              <div
                key={order._id}
                className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400/30 transition"
              >

                {/* Product name */}
                <h2 className="text-lg font-semibold text-white mb-2 truncate">
                  {order.product?.name || 'Product removed'}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {order.product?.description}
                </p>

                {/* Status */}
                <div className="flex gap-2 mb-4 flex-wrap">

                  <span className={`text-xs px-3 py-1 rounded border ${
                    order.product?.stock > 0
                      ? 'text-emerald-400 border-emerald-400/20'
                      : 'text-red-400 border-red-400/20'
                  }`}>
                    {order.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>

                  <span className="text-xs px-3 py-1 rounded border border-cyan-400/20 text-cyan-300">
                    Qty: {order.quantity || 1}
                  </span>

                </div>

                {/* Price */}
                <p className="text-xl font-bold text-cyan-400 font-['Orbitron',monospace]">
                  ${(order.product?.price || 0) * (order.quantity || 1)}
                </p>

                {/* Phone */}
                <p className="text-xs text-gray-400 mt-2">
                  Phone: {order.phone}
                </p>

                {/* Date */}
                <p className="text-[10px] text-gray-500 mt-4 border-t border-cyan-400/10 pt-3">
                  Ordered: {new Date(order.createdAt).toLocaleDateString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}