import { createBrowserRouter } from 'react-router-dom'
import { ChartPieIcon, LanguageIcon } from '@heroicons/react/24/solid'

import List from './Pages/LanguageFiles/List'
import Dashboard from './Pages/Dashboard'
import Layout from './components/layouts/Layout'


const routes = [
    {
      index: true,
      element: <Dashboard/>,
      label: 'Dashboard',
      icon: <ChartPieIcon className='icon'/>
    }, 
    {
      path:'languages',
      element: <List/>,
      label: 'Languages',
      icon: <LanguageIcon className='icon'/>
    }
  ]
  
  
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout routes={routes}/>,
      children: routes
    }
  ])

  export default router;