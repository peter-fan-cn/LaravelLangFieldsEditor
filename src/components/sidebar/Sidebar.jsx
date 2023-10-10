import Navbar from './Navbar'
import MenuItem from './MenuItem'
import './Sidebar.css'
export default function Sidebar ({ menus = [] }) {
  return (
    <Navbar>
      {
        menus.map(menu=><MenuItem path={menu.path} label={menu.label} icon={menu.icon} key={menu.path}/>)
      }
    </Navbar>
  )
}
