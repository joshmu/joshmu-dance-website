import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import { useGlobalContext } from '@/context/globalContext'

export const Compressor = ({ text, hide, ...props }) => {
  const [output, setOutput] = useState(['', '', ''])
  const [toggle, setToggle] = useState(false)

  const { scrollProgress } = useGlobalContext()
  const controls = useAnimation()

  useEffect(() => {
    // split text in to 3 parts
    const textArray = Array(3)
    textArray[0] = text.slice(0, text.indexOf(hide))
    textArray[1] = hide
    textArray[2] = text.slice(text.indexOf(hide) + hide.length)
    setOutput(textArray)
  }, [])

  useEffect(() => {
    controls.start(toggle ? 'hide' : 'show')
  }, [toggle])

  useEffect(() => {
    if (scrollProgress > 0) {
      setToggle(true)
    } else if (toggle && scrollProgress === 0) {
      setToggle(false)
    }
  }, [scrollProgress])

  const animationVariants = {
    hide: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: 'auto',
      opacity: 1,
    },
    transition: {
      duration: 1,
    },
  }

  return (
    <p className="flex items-center justify-center whitespace-pre" {...props}>
      <span>{output[0]}</span>
      <motion.span
        variants={animationVariants as any}
        animate={controls}
        className="overflow-hidden"
      >
        <span>{output[1]}</span>
      </motion.span>
      <span>{output[2]}</span>
    </p>
  )
}
