import React from 'react'
import ReactDOM from 'react-dom/client'
import { getName } from '@tauri-apps/api/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './Containers/App'
import SideBar from './components/Sidebar'
import './styles.css'
import Header from './components/header/Header';


const router = createBrowserRouter([
  {
    path: '/hello',
    element: <div>Hello world!</div>
  },
  {
    path: '/',
    Component: App
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='min-h-screen w-full'>
      <div className='flex gap-6 overflow-hidden bg-gray-50 dark:bg-gray-900 h-full'>
        <SideBar />
        <main className='p-4 sm:ml-64 grow bg-white'>
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  </React.StrictMode>
)
