import LineAccent from './LineAccent'

export default function Gallery() {
  return (
    <section className='text-gray-700 body-font'>
      <div className='container flex flex-wrap px-5 py-24 mx-auto'>
        <div className='w-full mb-8 text-center'>
          <h2 className='text-3xl font-light uppercase whitespace-pre'>
            snapshots of my
            <span className='font-semibold '> life</span>
          </h2>
          <LineAccent center />
        </div>
        <div className='flex flex-wrap -m-1 md:-m-2'>
          <div className='flex flex-wrap w-1/2'>
            <div className='w-1/2 p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/500x300'
              />
            </div>
            <div className='w-1/2 p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/501x301'
              />
            </div>
            <div className='w-full p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/600x360'
              />
            </div>
          </div>
          <div className='flex flex-wrap w-1/2'>
            <div className='w-full p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/601x361'
              />
            </div>
            <div className='w-1/2 p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/502x302'
              />
            </div>
            <div className='w-1/2 p-1 md:p-2'>
              <img
                alt='gallery'
                className='block object-cover object-center w-full h-full'
                src='https://dummyimage.com/503x303'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
