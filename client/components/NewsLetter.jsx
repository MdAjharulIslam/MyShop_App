'use client'

import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#020b18] py-16 sm:py-20 md:py-24 font-['DM_Sans',sans-serif]">

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-24 text-center">
        <div className="max-w-2xl mx-auto w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded bg-cyan-400/8 border border-cyan-400/30 font-['Orbitron',monospace] text-[10px] tracking-[2.5px] text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            STAY IN THE LOOP
          </div>

          {/* Title */}
          <h1
            className="mb-4 leading-none font-['Orbitron',monospace] font-black text-white"
            style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}
          >
            Never Miss a <span className="text-cyan-400">Deal!</span>
          </h1>

          {/* Subtitle */}
          <p
            className="mb-9 mx-auto max-w-md leading-relaxed font-light tracking-wide text-sky-200/75"
            style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}
          >
            Subscribe for latest offers, new arrivals & exclusive discounts
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex bg-white/5 border border-cyan-400/20 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-cyan-400/50">

              <input
                className="w-full px-5 sm:px-7 py-4 sm:py-5 bg-transparent outline-none text-white placeholder-sky-300/30"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading || status === 'success'}
                className="m-2 px-6 sm:px-8 py-3 bg-cyan-400 text-[#020b18] font-['Orbitron',monospace] font-bold text-[11px] tracking-widest rounded-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                {isLoading ? 'SUBSCRIBING' : status === 'success' ? 'DONE' : 'SUBSCRIBE'}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default NewsLetter;