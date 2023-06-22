import { classlist } from "#/utils/string/classlist"
import { ComponentProps } from "preact"
import { usePageContext } from "./PageContext"

function Link(props: ComponentProps<'a'>) {
    const pageContext = usePageContext()
    const className = classlist(props.className, pageContext?.urlPathname === props.href && 'is-active')
    return <a {...props} className={className} />
}

export { Link }
