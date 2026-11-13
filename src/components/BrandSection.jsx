import React from 'react'

function BrandSection() {
    return (
        <section className='bg-black text-white py-24 px-6 '>
            <div className='max-w-7xl mx-auto text-center space-y-4'>

                <p className='text-sm tracking-[0.2em] font-semibold text-gray-500'>
                    THE AURAFIT STANDARD
                </p>

                <h1 className='text-2xl md:text-6xl lg:text-4xl font-black tracking-tight mb-8'>
                    PUSH BEYOND YOUR LIMITS
                </h1>
                <p className='text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed'>
                    Built for those who challenge themselves. Designed to move with purpose.
                </p>
            </div>
        </section>
    )
}

export default BrandSection