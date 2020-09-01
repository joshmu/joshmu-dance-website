import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Slider({ content, duration = 5000, ...props }) {
  const [output, setOutput] = useState(null)
  const [pos, setPos] = useState(0)

  let timer
  useEffect(() => {
    // initiate timer to change pos
    clearTimeout(timer)
    timer = setTimeout(() => changeContent(pos), duration)
    // remove timer if we unmount
    return () => clearTimeout(timer)
  }, [pos])

  function changeContent(index) {
    setOutput(content[index])
    if (index === content.length - 1) {
      setPos(0)
    } else {
      setPos(index + 1)
    }
  }

  return (
    <ul className='flex items-center justify-center'>
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={pos}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <div {...props}>{output}</div>
        </motion.div>
      </AnimatePresence>
    </ul>
  )
}
