import { Outlet } from 'react-router-dom'
import { Menubar } from 'primereact/menubar'
import logo from '../../assets/logo.svg'
import {  useDispatch } from 'react-redux';
import {  selectFolder } from '../../store/root';


export function MainMenu () {
  const dispatch = useDispatch();
  const items = [
        {
          label: 'Open',
          icon: 'pi pi-fw pi-folder-open',
          command:()=>{
            dispatch(selectFolder())
          }
        
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-file-edit',
        
        },
        {
          label: 'Close',
          icon: 'pi pi-fw pi-power-off'
        }
  ]
  const start = <img src={logo} height="40" className="mr-2 w-10 h-10"/>
  return <Menubar model={items} start={start}/>
}

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
