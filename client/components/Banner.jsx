'use client'
import Link from 'next/link';

export default function Banner({
  title = "Welcome to MyShop",
  subtitle = "Find the best products at unbeatable prices — engineered for the future, available today.",
  buttonText = "Shop Now",
  buttonLink = "/allProducts",
}) {
  const words = title.split(' ')

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[560px] xl:min-h-[640px] rounded-2xl overflow-hidden flex items-center justify-center bg-[#020b18]">

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-10 lg:px-14 py-12 w-full max-w-4xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded bg-cyan-400/8 border border-cyan-400/30 font-['Orbitron',monospace] text-[10px] tracking-[2.5px] text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          TRENDING CHOICE
        </div>

        {/* Title (wider X-axis + better line control) */}
        <h1
          className="mb-4 leading-tight font-['Orbitron',monospace] font-black text-white mx-auto"
          style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            maxWidth: '900px'
          }}
        >
          {words.map((word, i) =>
            i === words.length - 1
              ? <span key={i} className="text-cyan-400"> {word}</span>
              : word + ' '
          )}
        </h1>

        {/* Subtitle (wider) */}
        <p
          className="mb-9 mx-auto max-w-3xl leading-relaxed font-light tracking-wide text-sky-200/75"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}
        >
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link href={buttonLink}>
            <button className="inline-flex items-center gap-2.5 rounded font-bold font-['Orbitron',monospace] text-[13px] tracking-wide bg-cyan-400 text-[#020b18] px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5">
              {buttonText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>

          <Link href="/about">
            <button className="inline-flex items-center gap-2 rounded text-sm text-sky-200/80 bg-transparent border border-cyan-400/25 px-6 py-3.5 transition-all duration-200 hover:border-cyan-400/60 hover:text-cyan-400">
              Learn More →
            </button>
          </Link>
        </div>

        {/* Stats (unchanged) */}
        <div className="flex gap-8 justify-center mt-9 pt-7 flex-wrap border-t border-cyan-400/10">
          {[['10K+', 'Products'], ['99%', 'Satisfaction'], ['24/7', 'Support']].map(([val, label], i, arr) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-1">
                <span className="font-['Orbitron',monospace] text-xl font-bold text-cyan-400">
                  {val}
                </span>
                <span className="text-[10px] tracking-[1.5px] uppercase text-sky-300/50">
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div className="w-px h-9 bg-cyan-400/15" />
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}