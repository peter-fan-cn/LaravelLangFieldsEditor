

export default function Navbar({ children, ...props }) {

    return (
        <aside {...props} className="sidebar" aria-label="Sidebar">
            <div className="container">
                <ul className='space-y-2 font-medium'>
                {children}
                </ul>
            </div>
        </aside>
    )
}