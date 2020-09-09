import ReactGA from 'react-ga'

const trackingId = 'UA-31428430-1'

export const initGA = () => {
  ReactGA.initialize(trackingId)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
