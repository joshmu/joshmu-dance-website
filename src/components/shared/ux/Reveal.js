import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Reveal({
  children,
  variants = null,
  transition = null,
  ...props
}) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    // triggerOnce: true,
    // rootMargin: '300px',
  })

  // todo: check screen shot from akram
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <>
      <motion.div
        ref={ref}
        animate={controls}
        initial='hidden'
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 25 },
          ...variants,
        }}
        transition={{
          duration: 0.8,
          ease: [0.6, 0.05, -0.01, 0.9],
          ...transition,
        }}
        {...props}
      >
        {children}
      </motion.div>
    </>
  )
}
