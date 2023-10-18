import classNames from "classnames";
import './Button.css'

export default function Button({children, className, ...props}) {
    return (<button {...props} className={classNames('btn', className)} >{children}</button>)
}