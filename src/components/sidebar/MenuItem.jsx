
import {Link} from 'react-router-dom'
export default function MenuItem ({label, path, icon }) {
  return (
    <li>
      <Link
        to={path}
        className="menu-item group"
      >
        {icon}
        <span className='ml-3'>{label}</span>
      </Link>
    </li>
  )
}
