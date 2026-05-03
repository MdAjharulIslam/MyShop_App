'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AdminOrdersPage() {
  const router = useRouter()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async (authToken) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/orders`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )

      if (res.data.success) {
        setOrders(res.data.orders)
      }
    } catch (err) {
      toast.error('Failed to fetch orders')
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

    fetchOrders(savedToken)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020b18] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sky-200/70 text-lg">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020b18] px-6 py-16">

      
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-black font-['Orbitron',monospace] text-white">
          Admin <span className="text-cyan-400">Orders</span>
        </h1>
        <p className="text-sky-200/60 mt-3">
          Manage all customer orders in real time
        </p>
      </div>

      
      {orders.length === 0 ? (
        <div className="text-center text-sky-200/60">
          No orders found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {orders.map(order => {
            const totalPrice =
              (order.product?.price || 0) * (order.stock || 0)

            return (
              <div
                key={order._id}
                className="bg-white/5 border border-cyan-400/20 backdrop-blur-xl rounded-3xl p-6 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] transition-all duration-300"
              >

                
                <h2 className="text-xl font-bold text-white mb-4 font-['Orbitron',monospace] truncate">
                  {order.product?.name || 'Product Removed'}
                </h2>

             
                <div className="space-y-2 text-sky-200/70 text-sm">

                  <p>
                    <span className="text-cyan-400 font-semibold">Customer:</span>{' '}
                    {order.customer?.name || 'Unknown'}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">Email:</span>{' '}
                    {order.customer?.email || 'N/A'}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">Phone:</span>{' '}
                    {order.phone}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">Quantity:</span>{' '}
                    {order.stock}
                  </p>

                  <p className="text-lg font-black text-cyan-400 mt-3">
                    Total: ${totalPrice}
                  </p>

                  <p>
                    <span className="text-cyan-400 font-semibold">Remaining Stock:</span>{' '}
                    {order.product?.stock ?? 0}
                  </p>
                </div>

              
                <div className="mt-5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                    ORDERED
                  </span>
                </div>

               
                <p className="text-xs text-sky-200/40 mt-5 border-t border-cyan-400/10 pt-4">
                  {new Date(order.createdAt).toLocaleString()}
                </p>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}