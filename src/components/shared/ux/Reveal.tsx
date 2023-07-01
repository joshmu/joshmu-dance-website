import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface RevealProps {
  children: React.ReactNode
  variants?: any
  transition?: any
  props?: any
}

export const Reveal = ({
  children,
  variants = null,
  transition = null,
  ...props
}: RevealProps) => {
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
    <motion.span
      ref={ref}
      animate={controls}
      initial="hidden"
      style={{ display: 'inline-block' }}
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
    </motion.span>
  )
}
