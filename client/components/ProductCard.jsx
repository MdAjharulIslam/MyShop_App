'use client'
import { useRouter } from 'next/navigation'

export default function ProductCard({ product, isBestSeller, rank }) {
  const router = useRouter()
  const { name, price, stock, image, totalSold } = product

  const handleBooking = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/allProducts/${product._id}/booking`)
  }

  return (
    <div
      onClick={() => router.push(`/allProducts/${product._id}`)}
      className="bg-[#0b0f14] border border-cyan-400/10 rounded-2xl overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:border-cyan-400/30 hover:-translate-y-1 font-['DM_Sans',sans-serif]"
    >

    
      {isBestSeller && rank && (
        <div className="absolute top-3 right-3 z-10 bg-cyan-400 text-[#020b18] px-3 py-1 rounded-lg text-[10px] font-['Orbitron',monospace] tracking-wide font-bold">
          🏆 #{rank}
        </div>
      )}

    
      <div className="h-48 bg-[#111827] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl text-gray-500">📦</span>
        )}
      </div>

    
      <div className="p-4 flex flex-col flex-grow">

      
        <h3 className="text-base font-semibold text-white mb-2 truncate tracking-wide">
          {name}
        </h3>

        <p className="text-cyan-400 font-bold text-lg mb-2 font-['Orbitron',monospace]">
          ${price?.toFixed(2) || '0.00'}
        </p>

       
        <p className={`text-sm mb-3 font-medium ${
          stock > 0 ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
        </p>

       
        {isBestSeller && totalSold && (
          <p className="mb-4 text-xs text-sky-200/60 tracking-wide">
            {totalSold.toLocaleString()} sold
          </p>
        )}

        
        <div className="mt-auto">
          {stock > 0 ? (
            <button
              onClick={handleBooking}
              className="w-full bg-cyan-400 text-[#020b18] py-2.5 rounded-xl font-['Orbitron',monospace] text-[11px] tracking-widest font-bold transition-all hover:bg-cyan-300"
            >
              🛒 BOOK NOW
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-700 text-gray-300 py-2.5 rounded-xl font-medium cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>

      </div>
    </div>
  )
}