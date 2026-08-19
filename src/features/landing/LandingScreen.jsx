import Button from '../../components/FormElements/Button'

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
      
      {/* Content */}
      <div className='relative z-10 flex w-full max-w-md flex-col items-center text-center'>
                
                {/* Logo */}
                <div className='mb-2'>
                  <div className='flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10'>
                    <span className='text-2xl font-bold'>
                        E
                    </span>
                  </div>
                </div>

                {/* CTA BUTTON */}
                <Button onClick={onContinue}
                  className='mt-10 w-full rounded-full bg-white p-4 font-semibold uppercase text-black'
                >
                  GET STARTED
                </Button>
              </div>
      </section>
    </main>
    )
}