
import {NavLink} from 'react-router-dom'
export default function MenuItem ({ children, label, path, icon, ...props }) {
  return (
    <li>
      <a
        href={"#"+path}
        className="menu-item group"
      >
        {icon}
        <span className='ml-3'>{label}</span>
      </a>
    </li>
  )
}
