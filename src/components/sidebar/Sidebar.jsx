import Navbar from './Navbar'
import MenuItem from './MenuItem'
import './Sidebar.css'
export default function Sidebar ({ routes = [] }) {
  return (
    <Navbar>
      {
        routes.map((route, i)=><MenuItem path={route.path} label={route.label} icon={route.icon} key={i}/>)
      }
    </Navbar>
  )
}
