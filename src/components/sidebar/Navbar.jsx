import Header from "../header/Header";


export default function Navbar({ children, ...props }) {

    return (
        <aside {...props} className="sidebar" aria-label="Sidebar">
            <div className="container">
            <a href="/" class="flex items-center pl-2.5 mb-5">
                <Header class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"/>
            </a>
                <ul className='space-y-2 font-medium'>
                {children}
                </ul>
            </div>
        </aside>
    )
}