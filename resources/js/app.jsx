import { createRoot } from 'react-dom/client'
import { createInertiaApp, router } from '@inertiajs/react' // Gunakan router dari sini
import React from 'react'
import '../css/app.css'
import PageLoader from './Components/PageLoader'

const pages = import.meta.glob('./Pages/**/*.jsx')

createInertiaApp({
  resolve: name => {
    const page = pages[`./Pages/${name}.jsx`]
    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }
    return page()
  },
  setup({ el, App, props }) {
    const LoaderWrapper = () => {
      const [loading, setLoading] = React.useState(false)

      React.useEffect(() => {
        const unbindStart = router.on('start', () => setLoading(true))
        const unbindFinish = router.on('finish', () => setLoading(false))

        return () => {
          unbindStart()
          unbindFinish()
        }
      }, [])

      return (
        <>
          {loading && <PageLoader />}
          <App {...props} />
        </>
      )
    }

    createRoot(el).render(<LoaderWrapper />)
  },
})