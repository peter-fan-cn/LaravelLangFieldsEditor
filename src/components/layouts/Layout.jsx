import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

export default function Layout ({ routes, children }) {
  return (
    <div className='min-h-screen w-full'>
      <div className='flex gap-6 overflow-hidden bg-gray-50 dark:bg-gray-900 h-full'>
        <Sidebar routes={routes} />
        <main className='p-4 sm:ml-64 grow bg-white'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
