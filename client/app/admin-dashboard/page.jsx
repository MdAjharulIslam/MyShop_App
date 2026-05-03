'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, DollarSign, Car } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async (token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/dashboard`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.data.success) {
        setStats(res.data.stats)
      }
    } catch (err) {
      toast.error('Failed to load dashboard stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin-login')
      return
    }

    fetchDashboard(token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    toast.success('Logged out')
    router.push('/admin-login')
  }

  return (
    <div className="min-h-screen bg-[#020b18] text-white font-['DM_Sans',sans-serif]">

      {/* NAV */}
      <div className="border-b border-cyan-400/10 px-6 py-4 flex justify-between items-center">

        <h1 className="font-['Orbitron',monospace] text-xl">
          My<span className="text-cyan-400">Shop</span> Admin
        </h1>

        <div className="flex gap-3">
          <Link href="/admin-dashboard" className="text-sm text-gray-400 hover:text-cyan-400">
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 bg-cyan-400 text-[#020b18] rounded-lg font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TITLE */}
        <div className="mb-10">
          <h2 className="text-4xl font-['Orbitron',monospace] font-bold">
            Admin <span className="text-cyan-400">Dashboard</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Manage your store in real time
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : stats && (
          <>
            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">

              <div className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-6">
                <ShoppingBag className="text-cyan-400 mb-2" />
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold">{stats.totalOrders}</p>
              </div>

              <div className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-6">
                <DollarSign className="text-cyan-400 mb-2" />
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-3xl font-bold">
                  ${stats.totalRevenue}
                </p>
              </div>

              <div className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-6">
                <Car className="text-cyan-400 mb-2" />
                <p className="text-gray-400 text-sm">Top Product</p>
                <p className="text-xl font-bold">
                  {stats.topProducts?.[0]?.name || 'N/A'}
                </p>
              </div>

            </div>

            {/* QUICK ACTIONS */}
            <h3 className="text-xl font-bold mb-6 text-cyan-400">
              Quick Actions
            </h3>

            <div className="grid md:grid-cols-4 gap-5">

              {[
                { href: '/admin-dashboard/addProducts', label: 'Add Products' },
                { href: '/admin-dashboard/orders', label: 'View Orders' },
                { href: '/admin-dashboard/products', label: 'Manage Products' },
                { href: '/', label: 'Live Store' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-[#0b0f14] border border-cyan-400/10 rounded-xl p-5 hover:border-cyan-400/40 transition text-center"
                >
                  {item.label}
                </Link>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  )
}