import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './Containers/App'
import SideBar from './components/Sidebar'
import './styles.css'

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
    <div className='flex gap-6 overflow-hidden bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <SideBar />
      <main className='p-4 sm:ml-64 grow bg-white'>
        <RouterProvider router={router} />
      </main>
    </div>
  </React.StrictMode>
)
