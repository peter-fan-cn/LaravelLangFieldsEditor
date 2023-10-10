
export default function MenuItem ({ children, label, href, icon, ...props }) {
  return (
    <li>
      <a
        href={href || '#'}
        className="menu-item group"
      >
        {icon}
        <span className='ml-3'>{label}</span>
      </a>
    </li>
  )
}
