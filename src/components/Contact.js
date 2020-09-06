import { useState } from 'react'
import Reveal from './Reveal'
import LineAccent from './LineAccent'
import useLocation from '../hooks/useLocation'

export default function Contact() {
  const { ref } = useLocation('contact')
  // todo: encode html email

  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = e => {
    // match the state props with the placeholder names
    const id = e.target.placeholder.toLowerCase()
    setState({ ...state, [id]: e.target.value })
  }

  const handleSubmit = async () => {
    const url = '/api/email'

    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...state }),
    }

    try {
      const fetchResponse = await fetch(url, settings)
      const data = await fetchResponse.json()
      console.log('response', data) // parses JSON response into native JavaScript objects
      // todo: confirmation/error received message
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <section ref={ref} className='relative text-themeText'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col w-full mb-12 text-center'>
          <h2 className='mb-2 text-2xl font-light text-themeText sm:text-3xl'>
            FEEL FREE TO <span className='font-semibold'>CONTACT ME</span>
          </h2>
          <LineAccent center />
          <p className='mx-auto mt-4 text-sm italic leading-relaxed lg:w-2/3'>
            Let's talk!
          </p>
        </div>
        <div className='mx-auto lg:w-1/2 md:w-2/3'>
          <div className='flex flex-wrap -m-2 text-gray-900'>
            <div className='w-1/2 p-2'>
              <input
                value={state.name}
                onChange={handleChange}
                className='w-full px-4 py-2 text-base bg-gray-100 border border-gray-400 rounded-sm focus:outline-none focus:border-themeAccent'
                placeholder='Name'
                type='text'
              />
            </div>
            <div className='w-1/2 p-2'>
              <input
                value={state.email}
                onChange={handleChange}
                className='w-full px-4 py-2 text-base bg-gray-100 border border-gray-400 rounded-sm focus:outline-none focus:border-themeAccent'
                placeholder='Email'
                type='email'
              />
            </div>
            <div className='w-full p-2'>
              <textarea
                onChange={handleChange}
                className='block w-full h-48 px-4 py-2 text-base bg-gray-100 border border-gray-400 rounded-sm resize-none focus:outline-none focus:border-themeAccent'
                placeholder='Message'
              ></textarea>
            </div>
            <div className='w-full p-2'>
              <button
                onClick={handleSubmit}
                className='flex px-8 py-2 mx-auto text-lg text-white uppercase transition-colors duration-300 ease-in-out border-0 rounded-sm bg-themeAccent focus:outline-none hover:bg-orange-500'
              >
                send
              </button>
            </div>
            <div className='w-full p-2 pt-8 mt-8 text-center border-t border-gray-200'>
              <Reveal>
                <a className='text-themeAccent'>👋 hello@joshmu.com</a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
