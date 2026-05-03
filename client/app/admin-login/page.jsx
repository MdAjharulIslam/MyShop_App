'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
        { email, password }
      )

      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token)
        toast.success('Admin login successful 🎉')
        router.push('/admin-dashboard')
      } else {
        toast.error(res.data.message || 'Invalid credentials ❌')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020b18] flex items-center justify-center px-4 font-['DM_Sans',sans-serif]">

      <div className="w-full max-w-md bg-[#0b0f14] border border-cyan-400/10 rounded-2xl p-8">

        
        <h2 className="text-center text-2xl font-['Orbitron',monospace] font-bold text-white mb-6">
          Admin <span className="text-cyan-400">Login</span>
        </h2>

        
        <form onSubmit={handleAdminLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#111827] border border-cyan-400/10 rounded-lg text-white outline-none focus:border-cyan-400/40"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#111827] border border-cyan-400/10 rounded-lg text-white outline-none focus:border-cyan-400/40"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-400 text-[#020b18] py-2.5 rounded-xl font-bold font-['Orbitron',monospace] text-sm tracking-widest hover:bg-cyan-300 transition disabled:opacity-50"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN AS ADMIN'}
          </button>

        </form>

      
        <p className="mt-6 text-center text-sm text-gray-400">
          <Link href="/" className="hover:text-cyan-400 transition">
            ← Back to Home
          </Link>
        </p>

      </div>
    </div>
  )
}