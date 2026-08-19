export default function LandingScreen({ onContinue }) { 
    return (
     <main className='min-h-screen bg-black text-white'>
       <section className='relative flex min-h-screen items-center justify-center overflow-hidden px-6'>
        
      {/* Art Direction for Banner image*/}
      <picture className='absolute inset-0'>

          <source media='(min-width: 900px)' alt='banner-image'
            srcSet='/src/assets/banner-desktop.webp'
          />

          <source media='(min-width: 600px)' alt='banner-image'
            srcSet='/src/assets/banner-tablet.webp'
          />

          <img src='/src/assets/banner-mobile.webp' alt='banner-image'
            className='h-full w-full object-cover
            object-[50%_50%]
            min-[600px]:object-[50%_75%]
            min-[900px]:object-[50%_100%]'
          />

      </picture>
      
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-black/10 via-50% via-black/60 via-75% to-black' />

      </section>
    </main>
    )
}