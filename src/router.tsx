import { createBrowserRouter } from 'react-router'

import Layout from '@/components/Layout/Layout'
import Index from '@/pages/Index'
import V2 from '@/pages/V2'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Index />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <V2 />
      </Layout>
    ),
  },
])

export default router
