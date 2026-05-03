'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function AccordionSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-cyan-400/10 md:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:py-0 md:pointer-events-none"
      >
        <h3 className="text-[11px] tracking-[2px] text-cyan-400 uppercase">
          {title}
        </h3>

        <svg
          className={`w-4 h-4 text-cyan-400/50 transition-transform md:hidden ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 md:max-h-none md:opacity-100 ${
          open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#020b18] border-t border-cyan-400/15 text-sky-200">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

         
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-xl text-white">
                My<span className="text-cyan-400">Shop</span>
              </span>
            </Link>

            <p className="text-sm text-sky-200/60">
              Your one-stop shop for the best products online. Quality guaranteed.
            </p>
          </div>

       
          <AccordionSection title="Quick Links">
            <ul className="space-y-3 md:mt-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/allProduct' },
                { label: 'Cart', href: '/cart' },
                { label: 'Login', href: '/login' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-sky-200/60 hover:text-cyan-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>

        
          <AccordionSection title="Contact Us">
            <ul className="space-y-3 text-sm md:mt-4 text-sky-200/60">
              <li>support@myshop.com</li>
              <li>+880 1234 567890</li>
              <li>Kaliganj, Bangladesh</li>
            </ul>
          </AccordionSection>

          
          <AccordionSection title="Follow Us">
            <div className="flex gap-3 md:mt-4">
              {[
                { icon: <FaFacebookF />, href: '#' },
                { icon: <FaTwitter />, href: '#' },
                { icon: <FaInstagram />, href: '#' },
                { icon: <FaLinkedinIn />, href: '#' },
              ].map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 flex items-center justify-center rounded bg-white/5 border border-cyan-400/10 text-sky-200/70 hover:text-cyan-400 hover:bg-white/10"
                >
                  {icon}
                </a>
              ))}
            </div>
          </AccordionSection>

        </div>

     
        <div className="border-t border-cyan-400/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-sky-200/40">
            &copy; {new Date().getFullYear()} MyShop. All rights reserved.
          </p>

          <p className="text-xs text-cyan-400/60">
            Secured & Encrypted
          </p>
        </div>

      </div>
    </footer>
  );
}