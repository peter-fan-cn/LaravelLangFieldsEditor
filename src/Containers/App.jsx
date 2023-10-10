
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ChartPieIcon, LanguageIcon } from '@heroicons/react/24/solid'
import SideBar from '../components/sidebar/Sidebar'
import List from '../Pages/LanguageFiles/List'
import Dashboard from '../Pages/Dashboard'
import Layout from '../components/layouts/Layout'

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


const router = createHashRouter([
  {
    path:"/",
    element: <Layout routes={routes}/>,
    children: routes
  }
])

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
