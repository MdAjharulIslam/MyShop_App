'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function AuthPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
          { email, password }
        )
        if (res.data.success) {
          localStorage.setItem('token', res.data.token)
          toast.success('Login successful 🎉')
          window.location.href = '/'
        } else {
          toast.error('Invalid Email or password')
        }
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
          { name, email, password }
        )
        if (res.data.success) {
          localStorage.setItem('token', res.data.token)
          toast.success('Registration successful 🎉')
          window.location.href = '/'
        } else {
          toast.error('All Fields Are Required')
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes gridShift {
          0%   { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .auth-grid {
          background-image:
            linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridShift 12s linear infinite;
        }
        .auth-pulse { animation: badgePulse 2s ease-in-out infinite; }
        .auth-logo-glow { text-shadow: 0 0 20px rgba(0,212,255,0.3); }
        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0a1628 inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>

      <div className="relative min-h-screen bg-[#020b18] flex items-center justify-center px-4 font-['DM_Sans',sans-serif] overflow-hidden">

        {/* Animated grid */}
        <div className="absolute inset-0 pointer-events-none auth-grid" />

        {/* Ambient orbs */}
        <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full pointer-events-none bg-blue-600/20 blur-[70px]" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full pointer-events-none bg-cyan-400/10 blur-[60px]" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full pointer-events-none bg-purple-600/15 blur-[50px] -translate-y-1/2" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md">

          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-sm" />
          <div className="absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-sm" />
          <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-sm" />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm" />

          <div className="bg-white/3 border border-cyan-400/15 rounded-2xl px-8 py-10 backdrop-blur-sm">

            {/* Logo */}
            <div className="text-center mb-8">
              <Link href="/">
                <span className="font-['Orbitron',monospace] font-black text-2xl text-white tracking-wide auth-logo-glow">
                  My<span className="text-cyan-400">Shop</span>
                </span>
              </Link>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-cyan-400/10 border border-cyan-400/30 font-['Orbitron',monospace] text-[10px] tracking-[2.5px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 auth-pulse" />
                {isLogin ? 'SECURE LOGIN' : 'CREATE ACCOUNT'}
              </div>
            </div>

            {/* Title */}
            <h2
              className="text-center font-['Orbitron',monospace] font-black text-white text-2xl sm:text-3xl mb-8 leading-none"
              style={{ textShadow: '0 0 30px rgba(0,212,255,0.2)' }}
            >
              {isLogin ? 'Welcome ' : 'Join '}<span className="text-cyan-400">{isLogin ? 'Back' : 'Us'}</span>
            </h2>

            {/* Toggle tabs */}
            <div className="flex bg-white/5 border border-cyan-400/15 rounded-lg p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-md text-[11px] font-['Orbitron',monospace] tracking-widest transition-all duration-200 ${
                  isLogin
                    ? 'bg-cyan-400 text-[#020b18] font-bold shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                    : 'text-sky-200/50 hover:text-sky-200/80'
                }`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-md text-[11px] font-['Orbitron',monospace] tracking-widest transition-all duration-200 ${
                  !isLogin
                    ? 'bg-cyan-400 text-[#020b18] font-bold shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                    : 'text-sky-200/50 hover:text-sky-200/80'
                }`}
              >
                REGISTER
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {!isLogin && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="auth-input w-full bg-white/5 border border-cyan-400/20 rounded-lg px-4 py-3.5 text-sm text-white font-light placeholder-sky-300/30 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:shadow-[0_0_16px_rgba(0,212,255,0.1)] focus:bg-white/8"
                  />
                </div>
              )}

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input w-full bg-white/5 border border-cyan-400/20 rounded-lg px-4 py-3.5 text-sm text-white font-light placeholder-sky-300/30 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:shadow-[0_0_16px_rgba(0,212,255,0.1)] focus:bg-white/8"
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input w-full bg-white/5 border border-cyan-400/20 rounded-lg px-4 py-3.5 text-sm text-white font-light placeholder-sky-300/30 outline-none transition-all duration-200 focus:border-cyan-400/50 focus:shadow-[0_0_16px_rgba(0,212,255,0.1)] focus:bg-white/8"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 bg-cyan-400 text-[#020b18] font-['Orbitron',monospace] font-bold text-[12px] tracking-widest rounded-lg transition-all duration-200 hover:-translate-y-px hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#020b18]/30 border-t-[#020b18] rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : isLogin ? (
                  <>
                    LOGIN
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                ) : (
                  <>
                    CREATE ACCOUNT
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-cyan-400/10" />
              <span className="text-[10px] tracking-[2px] text-sky-300/30 font-['Orbitron',monospace]">OR</span>
              <div className="flex-1 h-px bg-cyan-400/10" />
            </div>

            {/* Switch mode */}
            <p className="text-center text-sm text-sky-200/50 font-light">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 underline underline-offset-2"
              >
                {isLogin ? 'Register' : 'Login'}
              </button>
            </p>

            {/* Admin link */}
            {isLogin && (
              <p className="mt-3 text-center text-[11px] text-sky-300/30 tracking-wide">
                <Link
                  href="/admin-login"
                  className="hover:text-red-400/70 transition-colors duration-200 tracking-[1px] font-['Orbitron',monospace]"
                >
                  ADMIN ACCESS →
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}