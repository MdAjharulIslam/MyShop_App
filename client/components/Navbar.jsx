'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    toast.success('Logged out successfully 👋')
    router.push('/')
  }

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/allProducts' },
    { name: 'My Orders', href: '/myorders' },
  ]

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <nav className="sticky top-0 z-50 bg-[#020b18] border-b border-cyan-400/15 font-['DM_Sans',sans-serif]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              href="/"
              className="font-['Orbitron',monospace] font-black text-xl tracking-wide text-white no-underline transition-all duration-200 hover:[text-shadow:0_0_30px_rgba(0,212,255,0.6)]"
              style={{ textShadow: '0 0 20px rgba(0,212,255,0.3)' }}
            >
              My<span className="text-cyan-400">Shop</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7">

              {/* Pulse dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />

              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm text-sky-200/75 font-normal tracking-wide no-underline transition-colors duration-200 hover:text-cyan-400 group"
                >
                  {item.name}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-transparent text-red-400/85 border border-red-400/30 rounded px-4 py-1.5 text-sm font-normal cursor-pointer transition-all duration-200 hover:border-red-400/70 hover:text-red-400 hover:-translate-y-px hover:shadow-[0_0_14px_rgba(255,80,80,0.2)]"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-cyan-400 text-[#020b18] border-0 rounded px-5 py-2 font-['Orbitron',monospace] font-bold text-[11px] tracking-widest no-underline transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_18px_rgba(0,212,255,0.5)]"
                >
                  LOGIN
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-transparent border border-cyan-400/25 rounded text-cyan-400 px-2.5 py-1.5 text-lg leading-none cursor-pointer transition-all duration-200 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]"
              >
                {menuOpen ? '✖' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#020b18] border-t border-cyan-400/8 ${
            menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 pt-2 pb-5 flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sky-200/75 text-[15px] font-normal no-underline py-2.5 border-b border-cyan-400/6 transition-all duration-200 hover:text-cyan-400 hover:pl-1.5"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false) }}
                  className="w-full bg-transparent text-red-400/85 border border-red-400/30 rounded px-4 py-2 text-sm cursor-pointer transition-all duration-200 hover:border-red-400/70 hover:text-red-400"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-cyan-400 text-[#020b18] rounded px-5 py-2.5 font-['Orbitron',monospace] font-bold text-[11px] tracking-widest no-underline transition-all duration-200 hover:shadow-[0_0_18px_rgba(0,212,255,0.5)]"
                >
                  LOGIN
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}