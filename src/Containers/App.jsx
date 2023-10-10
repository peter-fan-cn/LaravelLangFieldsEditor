
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { ChartPieIcon, LanguageIcon } from '@heroicons/react/24/solid'
import SideBar from '../components/sidebar/Sidebar'
import List from '../Pages/LanguageFiles/List'
import Dashboard from '../Pages/Dashboard'

const routes = [
  {
    path: '/',
    Component: Dashboard,
    label: 'Dashboard',
    icon: <ChartPieIcon className='icon'/>
  }, 
  {
    path:'/languages',
    Component: List,
    label: 'Languages',
    icon: <LanguageIcon className='icon'/>
  }
]

const router = createHashRouter(routes)



function App() {
  return (
    <div className='min-h-screen w-full'>
      <div className='flex gap-6 overflow-hidden bg-gray-50 dark:bg-gray-900 h-full'>
        <SideBar menus={routes}/>
        <main className='p-4 sm:ml-64 grow bg-white'>
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default App;
