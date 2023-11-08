import { Outlet } from 'react-router-dom'
import MainMenu from '../menus/Menu'


export default function Layout () {
  return (
    <div className='w-full h-screen'>
      <MainMenu/>
      <div className='h-[calc(100%-82px)] overflow-auto gap-6 bg-gray-50 dark:bg-gray-900'>
          <Outlet />
      </div>
    </div>
  )
}
