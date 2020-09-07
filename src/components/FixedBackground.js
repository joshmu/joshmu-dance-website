export default function FixedBackground({
  src = './assets/waves.jpg',
  children,
  ...props
}) {
  return (
    <div
      className='relative w-full h-full'
      style={{
        background: `url(${src})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
